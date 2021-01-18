import React, {useState} from 'react'

export default function Login(props) {
    const [userLogin, setUserLogin] = useState({
        taiKhoan:'', 
        matKhau:''
    }); 
    const handleChange = (event) =>{
        let {name, value} = event.target; 
        setUserLogin({
            ...userLogin,
            [name]:value
        })
    }
    const handleLogin = (event) => {
        event.preventDefault(); 
        if(userLogin.taiKhoan === "cyberlearn" && userLogin.matKhau === "cyberlearn"){
            //thành công thì chuyển về trang trước đó 
            props.history.goBack(); 
            localStorage.setItem("userLogin", JSON.stringify(userLogin)); 
        } else {
            alert("Failed"); 
            return; 
        }
    }
    return (
        <form className="container" onSubmit = {handleLogin}>
        <h3>LOGIN</h3>
            <div className="form-group">
                <p>UserName</p>
                <input name="taiKhoan" className="form-control" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <p>Password</p>
                <input name="matKhau" type="password" className="form-control" onChange={handleChange}/>
            </div>
            <div className="form-group">
               <button className="btn btn-success">Đăng nhập</button>

            </div>
        </form>
    )
}
