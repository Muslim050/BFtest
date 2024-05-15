import React from "react";
//
import Eclipse from "src/assets/Site/Ellipse.png";

import { useDispatch } from "react-redux";
import { login } from "@/core/services/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import style from "./Login.module.scss";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(false);
  const [showPasswordOld, setShowPasswordOld] = React.useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onBlur",
  });
  const handleTogglePasswordOld = () => {
    setShowPasswordOld(!showPasswordOld);
  };
  const onSubmit = async (data:any) => {
    try {
      setIsLogin(true);

      const logindata = dispatch(login({data}));
      const role = localStorage.getItem("role");
      const routesByRole = {
        admin: "/order",
        publisher: "/inventory",
        channel: "/inventory",
        advertiser: "/order",
        guest: "/login",
        advertising_agency: "/order",
      };
      const redirectRoute = role ? routesByRole[role] : routesByRole.guest;
      navigate(redirectRoute);
      setIsLogin(false);
    } catch (error) {
      setIsLogin(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.login}>
          <img className={style.eclipse_1} src={Eclipse} alt="" />
          <img className={style.eclipse_2} src={Eclipse} alt="" />

          <div className={style.login__wrapper}>
            <div className={style.login__wrapper__table_header}>
              <div className={style.login__wrapper__table_title}>
                BRANDFORMANCE
              </div>
              <div className={style.login__wrapper__table_subtitle}>
                Войти в систему
              </div>
            </div>

            <div>
              <div
                className={style.modalWindow}
                style={{ marginBottom: "40px" }}
              >
                <div className={style.inputContainer}>

                  <input
                    className={style.modalWindow__input}
                    type="text"
                    placeholder="Логин"
                    autoComplete="off"
                    {...register("login", {
                      required: "Поле обезательно к заполнению",
                    })}
                  />

                  <span className={style.modalWindow__input_error}>
                    {errors?.login && <p>{errors?.login?.message}</p>}
                  </span>
                </div>
              </div>

              <div
                className={style.modalWindow}
                style={{ marginBottom: "80px" }}
              >
                <div className={style.inputContainer}>

                  <input
                    className={style.modalWindow__input}
                    type={showPasswordOld ? "text" : "password"}
                    placeholder="Пароль"
                    autoComplete="off"
                    {...register("password", {
                      required: "Поле обезательно к заполнению",
                    })}
                  />
                </div>

                <span className={style.modalWindow__input_error}>
                  {errors?.password && <p>{errors?.password?.message}</p>}
                </span>
                <div
                  onClick={handleTogglePasswordOld}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "15px",
                    cursor: "pointer",
                  }}
                >

                </div>
              </div>

              {/* <ButtonUI isValid={true} disabled={!isValid}>
                Войти
              </ButtonUI> */}
              <div className={style.btn__wrapper}>
                <button
                  style={{ display: "flex", alignItems: "center" }}
                  type="submit"
                  disabled={!isValid || isLogin}
                  className={
                    isValid && !isLogin
                      ? style.btn__wrapper__btn
                      : style.btn__wrapper__disabled
                  }
                >
                  {isLogin ? (
                    <>
                      <span>Войти</span>
                      <div className={style.loaderWrapper}>
                        <div className={style.spinner}></div>
                      </div>
                    </>
                  ) : (
                    <span>Войти</span>
                  )}
                </button>
              </div>
              {/* <ButtonUI isValid={true} disabled={!isValid}>
                Войти
              </ButtonUI> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
