$(function(){
    var title = document.title;
    if(title == '数据中心'){
        var params = {
            currentPage:1
        };
        function tableResponse(params,url){
            $.ajax({
                dataType: "json",
                url: url,
                data: params,
                success: function(data){
                    tableInit(data.data,params,parseInt(data.data.length/10)+1,url);
                }
            });
        }
        function tableInit(data,params,maxPage,url){

            var page = params.currentPage;
            if(data.length == 0){
                $("#table-content").html('<tr><td></td><td></td><td>找不到数据</td><td></td><td></td></tr>')
            }else{
                $("#table-content").empty();
                var len = (page-1)*10 + 10;
                if(len > data.length){
                    len = data.length;
                }
                for(var i=(page-1)*10; i<len; i++){
                    if(data[i].income < data[i].spending){
                        $("#table-content").append('<tr style="background-color: lavenderblush;"><td>' + (i+1) + '</td><td>'
                            + data[i].category + '</td><td>'
                            + data[i].income + '</td><td>'
                            + data[i].spending + '</td><td>'
                            + data[i].date
                            + '</td></tr>');
                    }else{
                        $("#table-content").append('<tr><td>' + (i+1) + '</td><td>'
                            + data[i].category + '</td><td>'
                            + data[i].income + '</td><td>'
                            + data[i].spending + '</td><td>'
                            + data[i].date
                            + '</td></tr>');
                    }

                }
                //生成类别选择框
                if(!params.category){
                    for(var i = 0,select = [];i < data.length; i++){
                        select[data[i].category] = 1;
                    }
                    $("#select-z").empty();
                    $("#select-z").append("<option value=''>全部</option>");
                    for(var key in select){
                        $("#select-z").append("<option value='"+key+"'>"+key+"</option>")
                    }
                }



                //分页组件
                $('.pagination').jqPagination({
                    link_string	: '/?page={page_number}',
                    max_page	: maxPage,
                    paged		: function(page) {
                        tableResponse({currentPage:page},url);
                    }
                });
            }
        }
        tableResponse(params,"../javascripts/aTest.json");

        $("#query-z").click(function(){

            if($("#select-z").val() !== ""){
                params.category = $("#select-z").val();
            }else{
                delete params.category;
            }

            tableResponse(params,"../javascripts/aTest.json");
        });
    }
    else if(title == "报表"){
        var myChart = echarts.init(document.getElementById('main'));

        $.get('../javascripts/report.json').done(function (data) {
            myChart.setOption({
                color:['#29C127','#FE9A38'],
                title: {
                    text: '年收入支出报表'
                },
                tooltip: {},
                legend: {
                    data:['收入','支出','超支']
                },
                toolbox: {
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                xAxis: {
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                },
                yAxis: {},
                series: [{
                    name: '收入',
                    type: 'bar',
                    data: data.data["income"],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    }
                },{
                    name: '支出',
                    type: 'bar',
                    data: data.data["spending"],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ],
                        itemStyle:{
                            normal:{
                                color: "#FE9A38"
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:function(item){
                                if(item.data > data.data["limitVal"]){
                                    return "#C23531";
                                }
                                return "#FE9A38";
                            }
                        }
                    }
                //},{
                //    name:"超支",
                //    type: 'bar',
                //    itemStyle: {
                //        normal: {
                //            color: function (item) {
                //                 return "#C23531";
                //            }
                //        }
                //    }
                }]
            });
        });
    }
    else if(title == "账户"){
        function profileInit(){
            $.ajax({
                dataType: "json",
                url: "../javascripts/profile.json",
                data: params,
                success: function(data){
                    $("#userName").val(data.data.userName);
                    $("#address").val(data.data.address).removeAttr("readonly");
                    $("#phone").val(data.data.phone).removeAttr("readonly");
                }
            });
        }
        profileInit();
        $("#profile-save").click(function(){
            $("#profile-form :input").attr("readonly","readonly");
        });
        $("#profile-submit").click(function(){
            var param = $("#profile-form").serialize();
            console.log(param);
            profileInit();
        });
    }
});


