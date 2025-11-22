class TMainStat{
    isDebug = false;
    	
	constructor(isDebug = false){
		this.isDebug = isDebug;
	}
	
	yandex_metrica(paramName){
        ym(97341856,'reachGoal',paramName);//96906393 - заменить на свое значение счётчика
    }

    SaveStat(paramName){
        $.ajax({
            url: './php_lib/stat.php',
            method: 'post',
            dataType: 'html',
            data: {stat: paramName},
            success: function(data){
                if (this.isDebug){
                    console.log('stat success');
                }
            }
        });
    }
}

export { TMainStat };
