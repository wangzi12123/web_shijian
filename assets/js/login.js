$(function(){
    //点击去注册账号的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()

})
//获取form对象
var form=layui.form
var layer=layui.layer
//通过form自定义效验规则
form.verify(
    {
        //定义了一个叫pwd的效验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'

          ] 
    }
)
//监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
    e.preventDefault();
    $.post('http://www.liulongbin.top:3007/api/reguser',
    {username:$('#form_reg [name=username]').val(),
    password:$('#form_reg [name=password]').val()},
    function(res){
        if(res.status!=0) {
        return layer.msg(res.message)

        }
        layer.msg('注册成功，请登录')
        //模拟人的点击行为
        $('#link_login').click()

    })
}) 
//登录表单
$('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
        url:'http://www.liulongbin.top:3007/api/login',
        method: 'POST',
        //快速获取表单数据
        data:$(this).serialize(),
        success:function(res){
            if(res.status!=0){
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')
        
            //跳转后台首页
         location.href='/index.html'
        }

    })
})
})