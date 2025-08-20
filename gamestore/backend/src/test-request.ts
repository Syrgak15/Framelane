async function main() {
    const res = await fetch("http://localhost:5000/reviews/hyman-matte-finish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Ivan",
            surname: "Petrov",
            email: "ivan@example.com",
            rating: 5,
            review: "Отличный телефон!",
        }),
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Не JSON-ответ:", res.status, contentType, "\n---\n", text);
        return;
    }

    const data = await res.json();
    console.log("Ответ сервера:", data);
}

main();
