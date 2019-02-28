$(document).ready(()=>{

    $('#btn-login').on('click',()=>{

        let user = $('#username-txt-box').val();
        let password = $('#password-txt-box').val();

        $.post('/authenticate', {user: user, pass: password }, ()=>{
            setUser(user,false);
            window.location.assign('/dashboard');
        });
    })
})