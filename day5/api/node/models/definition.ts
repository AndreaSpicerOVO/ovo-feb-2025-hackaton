/*

lIST OF  ENDPOINTS 
{
path, 
method,
schema,
parameters,


schema: {
"value1 : string | null ",}


}


Response



*/

const openApiSchema = {
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