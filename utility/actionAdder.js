function actionAdder(data){
    data = data.map((obj)=>{
        obj.action = `download(${obj.id})`
        obj.copy = `copyToClipboard(${obj.short})`
        return obj
    })
    return data
}

module.exports = actionAdder