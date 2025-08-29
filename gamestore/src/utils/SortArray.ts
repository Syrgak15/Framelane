export default function sortArray<T extends Record<string, any>>(
    arr: T[],
    order: "asc" | "desc" = "desc"
): T[] {
    return [...arr].sort((a, b) => {
        let valA: number;
        let valB: number;

        if ("createdAt" in a && "createdAt" in b) {
            valA = new Date(a.createdAt ?? 0).getTime();
            valB = new Date(b.createdAt ?? 0).getTime();
        } else {
            valA = Number(a?.id ?? 0);
            valB = Number(b?.id ?? 0);
        }

        return order === "desc" ? valB - valA : valA - valB;
    });
}
