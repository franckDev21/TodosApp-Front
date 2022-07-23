import React, { useEffect, useState } from 'react'
import { User } from '../../core/model/user.model';
import AuthService from '../../services/AuthService'

const Dashboard = () => {

  const { http } = AuthService();
  const [userDetail,setUserDetail ] = useState<User>({});
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetail();
  },[]);

  async function fetchUserDetail() {
    try {
      setLoading(true);
      const resp = await http.post('api/me');
      const user = await resp.data;

      setLoading(false);
      setUserDetail(user);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  return !loading ? (
    <>
      <h1>Dashboard</h1>
      <div>
        name : {userDetail.name} <br />
        Email : {userDetail.email}
      </div>
    </>
  ): (
    <div>Loading....</div>
  )
}

export default Dashboard