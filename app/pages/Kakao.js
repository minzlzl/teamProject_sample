"use client"
import axios from 'axios';
import React from 'react';
import KakaoLogin from 'react-kakao-login';

const Kakao = () => {
  const handleKakaoLogin =async (response) => {
    const u_id = response.profile.id;
    const u_nick = response.profile.properties.nickname;
    const d = await axios.post('/api/member',{u_id,u_nick})
    console.log(d.data);
    if(d.data[0] == false) {
      console.log("회원가입하셈"+d.data[1]);
    } else {
      console.log("이미 회원이셈");
    }


  };

  return (
    <div>
      <h1>Kakao Login Example</h1>

<KakaoLogin
        token={process.env.NEXT_PUBLIC_KAKAO_JS_KEY}
        onSuccess={handleKakaoLogin}
        onFail={console.error}
        onLogout={console.info}
    render={({ onClick }) => {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
        <img src="/btn.png" alt='' />
                  </a>
      );
    }}
  />
    </div>
  );
};

export default Kakao;