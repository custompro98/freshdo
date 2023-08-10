import isPresent from "./is-present.ts";

function get(key: string): string {
    const value = Deno.env.get(key);

    if (!isPresent(value)) {
        throw new Error(`${key} must be defined in the environment`);
    }

    return value;
}

export default { get };
