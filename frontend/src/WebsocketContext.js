import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { toggleLoading } from "./features/socket/socketSlice";

const WebsocketContext = createContext();

export const WebSocketProvider = props => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)

    const [ws, setWs] = useState(null)
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const socket = io(props.url, {
            auth: {
                token: user.token,
                admin: user.isAdmin,
                userName: user.userName,
            }
        });

        socket.on('connect', () => {
            console.log(socket.id);
            setIsConnected(true);
            dispatch(toggleLoading(false));
        });

        socket.on('disconnect', () => {
            setIsConnected(false)
        });

        const errorListener = err => setError(err);
        socket.on('connect_error', errorListener);
        setWs(socket);

        return () => {
            socket.removeAllListeners()
        }
    }, []);

    return (
        <WebsocketContext.Provider value={{ isConnected, ws, error }}>
            {props.children}
        </WebsocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebsocketContext);

export default WebsocketContext;