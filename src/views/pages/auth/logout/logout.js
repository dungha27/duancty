import React, { useEffect } from 'react'
import { GetLogout } from '../../../../api'

const Logout = () => {
  useEffect(() => {
    const result = GetLogout('logout')
    console.log(result)
    result
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <h1>Đăng xuất thành công. Trang sẽ được chuyển hướng để sau 1s</h1>
    </>
  )
}
export default Logout
