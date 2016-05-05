$(function(){
    var title = document.title;
    if(title == '数据中心'){
        $.getScript("../javascripts/jquery.jqpagination.min.js",function(){

        });
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
                for(var i = 0,select = [];i < data.length; i++){
                    select[data[i].category] = 1;
                }
                $("#select-z").empty();
                for(var key in select){
                    $("#select-z").append("<option>"+key+"</option>")
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
        tableResponse({currentPage:1},"../javascripts/aTest.json");

        $("#query-z").click(function(){
            var params = {
                currentPage:1
            };
            params.category = $("#select-z").val();
            tableResponse(params,"../javascripts/aTest.json");
        });


    }
});


