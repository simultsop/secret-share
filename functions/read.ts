export async function onRequestPost({env, request}) {
    const { publickey, privatekey } = await request.json()
    
    let storedInformation = await env.kv.get(publickey)
    if(storedInformation===null) {
        return new Response("Not found!", { status: 404 })
    }

    const { privatekey: storedPrivateKey, content } = JSON.parse(storedInformation)

    const btoaPrivateKey = btoa(privatekey);
    if(btoaPrivateKey!==storedPrivateKey) {
        return new Response(`Wrong privatekey!`, { status: 401 })
    }

    return Response.json({
        publickey,
        privatekey,
        content: atob(content)
    })
}
