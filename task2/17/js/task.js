/* ���ݸ�ʽ��ʾ
 var aqiSourceData = {
 "����": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// �������������������ģ�����ɲ�������
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "����": randomBuildData(500),
    "�Ϻ�": randomBuildData(300),
    "����": randomBuildData(200),
    "����": randomBuildData(100),
    "�ɶ�": randomBuildData(300),
    "����": randomBuildData(500),
    "����": randomBuildData(100),
    "����": randomBuildData(100),
    "����": randomBuildData(500)
};

// ������Ⱦͼ��������
var chartData = {};

// ��¼��ǰҳ��ı���ѡ��
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * ��Ⱦͼ��(day)
 */
function dayChart(city) {
    var ul = document.getElementById('ul');
    ul.innerHTML = '';
    var i = 0;
    for(var k in aqiSourceData[city]){
        var li = document.createElement('li');
        li.style.height = aqiSourceData[city][k] + 'px';
        li.style.left = i*18+'px';
        i++;
        ul.appendChild(li);
        //for(var i=0;i<30;i++){
        //    i1 = i+1;
        //    var li = document.createElement('li');
        //    li.style.height = aqiSourceData["����"]["2016-01-"+(i1<10?'0'+i1:i1)]+"px";
        //    li.style.left = i*20+'px';
        //    ul.appendChild(li);
        //}
    }
}
//��Ⱦͼ��(week)
function weekchart(city){
    var ul = document.getElementById('ul');
    ul.innerHTML = '';
    var i = 0;
    var avg = 0;
    var j = 0;
    for(var k in aqiSourceData[city]){
        avg += aqiSourceData[city][k]
        if(j%7==0&&j!=0){
            var li = document.createElement('li');
            li.style.height = Math.ceil(avg/7) + 'px';
            li.style.left = i*30+'px';
            i++;
            ul.appendChild(li);
            avg = 0;
        }
        j++
    }
}




//��Ⱦͼ��(month)
function monthchart(city){
    var ul = document.getElementById('ul');
    ul.innerHTML = '';
    var i = 0;
    var avg = 0;
    var j = 0;
    for(var k in aqiSourceData[city]){
        avg += aqiSourceData[city][k]
        if(j%30==0&&j!=0){
            var li = document.createElement('li');
            li.style.height = Math.ceil(avg/30) + 'px';
            li.style.left = i*60+'px';
            i++;
            ul.appendChild(li);
            avg = 0;
        }
        j++
    }
}

/**
 * �ա��ܡ��µ�radio�¼����ʱ���¼�ע�ắ��
 */
function graTimeChange(){
    // ȷ���Ƿ�ѡ����˱仯
    // ���ö�Ӧ����
    // ����ͼ����Ⱦ����
    var radio = document.querySelectorAll('#form-gra-time input');
    for(var i=0;i<radio.length;i++){
        radio[i].addEventListener('change',function(){
            var select = document.getElementById('city-select');
            var city = select.value;
            if(this.value == 'day'){
                dayChart(city)
            }
            if(this.value == 'week'){
                weekchart(city)
            }
            if(this.value == 'month'){
                monthchart(city)
            }

        })
    }}



/**
 * select�����仯ʱ�Ĵ�������
 */
function citySelectChange() {
    // ȷ���Ƿ�ѡ����˱仯
    var select = document.getElementById('city-select');
    var radio = document.querySelectorAll('#form-gra-time input');
    // ���ö�Ӧ����

    // ����ͼ����Ⱦ����
    select.addEventListener('change',function(){
    for(var k in aqiSourceData){
        if(this.value == k){
            if(radio[0].checked){
                dayChart(k)
            }
            if(radio[1].checked){
                weekchart(k)
            }
            if(radio[2].checked){
                monthchart(k)
            }
        }
        }
        //console.log(this.value);

    })
}
citySelectChange();

/**
 * ��ʼ���ա��ܡ��µ�radio�¼��������ʱ�����ú���graTimeChange
 */
function initGraTimeForm() {

}

/**
 * ��ʼ������Select����ѡ����е�ѡ��
 */
function initCitySelector() {
    // ��ȡaqiSourceData�еĳ��У�Ȼ������idΪcity-select�������б��е�ѡ��

    // ��select�����¼�����ѡ����仯ʱ���ú���citySelectChange

}

/**
 * ��ʼ��ͼ����Ҫ�����ݸ�ʽ
 */
function initAqiChartData() {
    // ��ԭʼ��Դ���ݴ�����ͼ����Ҫ�����ݸ�ʽ
    // �����õ����ݴ浽 chartData ��
}

/**
 * ��ʼ������
 */
function init() {
    graTimeChange()
    dayChart('����');
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
    console.log(aqiSourceData)