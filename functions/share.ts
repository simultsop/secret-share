export async function onRequestPost({env, request}) {
    const { publickey, privatekey, content } = await request.json()
    await env.kv.put(
        publickey,
        JSON.stringify({
            privatekey,
            content: btoa(content)
        })
    )

    return new Response("Information stored.")
}
