const request = async (url,
    method = 'GET',
    body = null) =>  {
    try{
        const responce = await fetch(url, { method, body});
        if(!responce.ok){
            throw new Error(`Could not fetch ${url}, status: ${responce.status}`)
        }

        const data = await responce.json();
        return data;
    }
    catch(e){
        throw e.message;
    }
}

export default request;