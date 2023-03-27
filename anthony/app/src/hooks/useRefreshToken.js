import axios from './axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:7074/Authenticate/refresh',
            withCredentials: true
        })
        setAuth(prev => {
            console.log("refreshing auth...")
            console.log(JSON.stringify(prev));
            console.log(response);
            return {
                ...prev,
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                access_token: response.data.access_token
            }
        });
        return response.data.access_token;
    }
    return refresh;
};

export default useRefreshToken;