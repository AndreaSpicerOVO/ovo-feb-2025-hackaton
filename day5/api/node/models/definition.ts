type Schema = {
  schema: {
    [key: string]:
      | string
      | boolean
      | number
      | null
      | object
      | Array<string | boolean | number | null | object>;
  };
};

export type Definition = {
  name: string;
  description: string;
  endpoints: Endpoint[];
};
export type Endpoint = {
  path: string;
  method: HttpMethods;

  request?: { schema: Schema; statusCode: number; name: string };
  responseSchema: { schema?: Schema; statusCode: number };
  parameters?: string[];
};



export type HttpMethods = "put" | "get" | "post" | "put" | "delete" | "patch"

export type OpenAPI = {
  openapi: string;
  info: {
    title?: string;
    description?: string;
    contact?: {
      email: string;
    };
    license?: {
      name: string;
      url: string;
    };
    version: string;
  };
  externalDocs: {
    description: string;
    url: string;
  };
  servers: {
    url: string;
  }[];
  tags: {
    name: string;
    description: string;
    externalDocs?: {
      description: string;
      url: string;
    };
  }[];
  paths: {
    [path: string]: {
      [method in HttpMethods]: {
        tags?: string[];
        summary?: string;
        description?: string;
        operationId?: string;
        parameters?: {
          name: string;
          in: string;
          description: string;
          required: boolean;
          schema: {
            type: string;
            format?: string;
            enum?: string[];
            default?: string;
          };
        }[];
        requestBody?: {
          description: string;
          content: {
            [mediaType: string]: {
              schema: {
                $ref: string;
              };
            };
          };
          required: boolean;
        };
        responses: {
          [statusCode: string]: {
            description: string;
            content?: {
              [mediaType: string]: {
                schema: {
                  $ref: string;
                };
              };
            };
          };
        };
        security?: {
          [securityScheme: string]: string[];
        }[];
      };
    };
  };
  components: {
    schemas: {
      [schemaName: string]: {
        type: string;
        properties: {
          [propertyName: string]: {
            type: string;
            format?: string;
            example?: any;
            description?: string;
            enum?: string[];
            $ref?: string;
            items?: {
              type: string;
              xml?: {
                name: string;
                wrapped?: boolean;
              };
              $ref?: string;
            };
            xml?: {
              name: string;
              wrapped?: boolean;
            };
          };
        };
        required?: string[];
        xml?: {
          name: string;
        };
      };
    };
    requestBodies: {
      [requestBodyName: string]: {
        description: string;
        content: {
          [mediaType: string]: {
            schema: {
              $ref: string;
            };
          };
        };
      };
    };
    securitySchemes: {
      [securitySchemeName: string]: {
        type: string;
        name?: string;
        in?: string;
        flows?: {
          implicit: {
            authorizationUrl: string;
            scopes: {
              [scope: string]: string;
            };
          };
        };
      };
    };
  };
};

type OpenApiSchema = {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
    };
    paths: {
        [path: string]: {
            [method in "get" | "post" | "put" | "delete" | "patch"]?: {
                summary: string;
                parameters?: Array<{
                    name: string;
                    in: "query" | "header" | "path" | "cookie";
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }>;
                responses: {
                    [statusCode: string]: {
                        description: string;
                        content: {
                            [mediaType: string]: {
                                schema: {
                                    type: string;
                                    properties: {
                                        [key: string]: {
                                            type: string;
                                            nullable?: boolean;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};

const openApiSchema: OpenApiSchema = {
    openapi: "3.0.0",
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation for the project"
    },
    paths: {
        "/example": {
            get: {
                summary: "Example GET endpoint",
                parameters: [
                    {
                        name: "param1",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        value1: {
                                            type: "string",
                                            nullable: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default openApiSchema;