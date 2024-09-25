 const matrix = async (datas)=> {
    try {
        let accuracy_rate = 0.0;
        let responseTime = 0.0;

        datas.forEach(data => {
            
            accuracy_rate = Math.round((accuracy_rate + data.accuracy)*100)/100;
            responseTime = Math.round((responseTime + data.response_time)*100)/100;
        });

        if (datas.length > 0) {
            accuracy_rate = Math.round(((accuracy_rate * 100) / datas.length) * 100) / 100;
            responseTime = Math.round((responseTime / datas.length) * 100) / 100;
        }

        
        return { accuracy: accuracy_rate, response_time: responseTime };
    } catch (error) {
        console.error('Error in matrix of helperFunction:', error);
        throw error;
    }
}

module.exports = matrix;


