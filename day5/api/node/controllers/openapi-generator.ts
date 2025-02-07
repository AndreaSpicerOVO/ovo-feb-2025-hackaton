import type { Request, Response } from "express";
import { Definition, Endpoint, HttpMethods, OpenAPI, Schema } from "../models/definition";
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
        apiDefinition.paths = {
          [path as string]: {
            [method as HttpMethods]: {
              tags: [],
              parameters,
              requestBody: endpoint.request?.schema
                ? {
                    content: {
                      "application/json": {
                        schema: {
                          $ref: `#/components/schemas/${endpoint.request?.name}`,
                        },
                      },
                    },
                  }
                : undefined,
              responses: {
                [endpoint.responseSchema?.statusCode]: {
                  description: "Test description",
                  content: {
                    "application/json": {
                      schema: {
                        "$ref": `#/components/schemas/${endpoint.responseSchema?.name}`,                       
                      },
                    },
                  },
                },
                components: {
                  schemas: {
                    [endpoint.request?.name as string]: {
                      type: "object",
                     ...mapSchema(endpoint.request?.schema as Schema),
                    },
                  },
                },
              },
            },
          },
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

const mapSchema = (schema: Schema) => {
    const keys: { key: string; type: string }[]= []
    Object.keys(schema.schema).forEach((key) => {
        console.log({
          [key]: {
            type: schema.schema[key as string],
          },
        });
        keys.push({[key] : {
            type: schema.schema[key as string],
        }})
    })
    return arrayToRecord(keys);

}

const arrayToRecord = (arr: { key: string; type: string }[]) => {
    return arr.reduce((acc, item) => {
        acc[item] = { type: item.type };
        return acc;
    }, {} as Record<string, { type: string }>);
};


