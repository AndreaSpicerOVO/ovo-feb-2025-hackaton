import type { Request, Response } from "express";
import { Definition, Endpoint, HttpMethods, OpenAPI } from "../models/definition";
import crypto from 'crypto';
import { promises as fs } from 'fs';

type Document = {id: string; 
    content: OpenAPI
};

export const generateApiDefintion = async (req: Request<Definition>, res: Response) => {

    const apiDefinition : Partial<OpenAPI>= {
        openapi: "3.0.0",
        info: {
        title: req.body.name,
        version: "1.0.0",
        description: req.body.description,
        },
        paths: {} as Record<string, any>,
    };
    const endpoints = req.body.endpoints;
    endpoints.forEach((endpoint : Endpoint) => {
        let path = endpoint.path;
        const method = endpoint.method.toLowerCase() as keyof HttpMethods;
       
       
        if (!apiDefinition.paths) {
            apiDefinition.paths = {};
        }
        apiDefinition.paths[path] = apiDefinition.paths[path] || {};

        const parameters =  endpoint?.parameters?.map((param) => ({ name: param, in: "query", required: true, schema: { type: "string" } }));
        endpoint.responseSchema?.statusCode
        //@ts-ignore
        apiDefinition.paths= {
            [path as string]: {
            [method as HttpMethods]: {
            tags: [],
            parameters,
            requestBody: {
                content: {
                    "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                        id: {
                            type: "number",
                        },
                        name: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                        },
                    },
                    },
                },
            },
            responses: {
                [endpoint.responseSchema?.statusCode]: {
                description: "Test description",
                content: {
                    "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                        id: {
                            type: "number",
                        },
                        name: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                        },
                    },
                    },
                },
            },
            security: []
            }
        }
    }
        };
        
    });
    const component = {id: crypto.randomUUID(), content: apiDefinition}
    try {
        await fs.access('output.json');
    } catch (error) {
        await fs.writeFile('output.json', JSON.stringify([]));
    }
        const data   = await fs.readFile('output.json', 'utf8');
        const json : Document[] = JSON.parse(data ?? []);
                await fs.writeFile(
                  "output.json",  
                  JSON.stringify([...json, component])
                );

        

    res.json(apiDefinition);
};
const arrayToRecord = <T extends { 
          name: string;
          in?: string;
          description?: string;
          required?: boolean;
          schema?: {
            type: string;
            format?: string;
            enum?: string[];
            default?: string;
          }}>(array: T[]): Record<string | number, T> => {
    return array.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
    }, {} as Record<string | number, T>);
};


export const getApiDefinition = () => {};
