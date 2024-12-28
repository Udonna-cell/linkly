function actionAdder(data){
    data = data.map((obj)=>{
        obj.action = `download(${obj.id})`
        return obj
    })
    return data
}

module.exports = actionAdder