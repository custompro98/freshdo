export default function isPresent<T>(maybe: T | undefined | null):  maybe is T {
    return maybe !== undefined && maybe !== null;
}
