{
  type ValidKeys = "region" | "services" | "freeTier";
  type CloudProvider = {
    name: string;
    // [keys: string]: string | number | boolean;
  } & Record<ValidKeys, string | number | boolean>;

  const provider1: CloudProvider = {
    name: "AWS",
    region: "eu-west-1",
    services: 200,
  };
}
