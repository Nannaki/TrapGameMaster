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
    const rooms = {
        admin: "Admin",
        adminGm: "Admin-GM",
        gm: "GM"
    }

    useEffect(() => {
        const socket = io(props.url, {
            auth: {
                token: user.token,
                admin: user.isAdmin,
                userName: user.userName,
            }
        });

        socket.on('connect', () => {
            setIsConnected(true);
            dispatch(toggleLoading(false));

            //Contrôle du rôle de l'utilisateur et attribution des rooms
            if(user.isAdmin) {
                socket.emit("join_room", rooms.admin);
            }
            else {
                socket.emit("join_room", rooms.gm);
            }

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