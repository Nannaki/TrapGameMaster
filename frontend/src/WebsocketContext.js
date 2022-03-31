//Imports
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { toggleLoading } from "./features/socket/socketSlice";

//Initialise le contexte
const WebsocketContext = createContext();

//Création du provider
export const WebSocketProvider = props => {

    //Initialisation variables et import des states
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const [ws, setWs] = useState(null)
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    //Définitions des romms Socket.io selon le rôle de l'utilisateur
    const rooms = {
        admin: "Admin",
        adminGm: "Admin-GM",
        gm: "GM"
    }

    //Instanciation du webSocket
    useEffect(() => {
        const socket = io(props.url, {
            auth: {
                token: user.token,
                admin: user.isAdmin,
            }
        });

        //Connection des utilisateurs Socket.io
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

        //Déconnexin des utilisateurs Socket.io
        socket.on('disconnect', () => {
            setIsConnected(false)
        });

        //Gestion des erreurs de connexion Socket.io
        const errorListener = err => setError(err);
        socket.on('connect_error', errorListener);
        setWs(socket);

        //Retrait des listeners
        return () => {
            socket.removeAllListeners()
        }
    }, []);

    //Envoie du provider WebSocket
    return (
        <WebsocketContext.Provider value={{ isConnected, ws, error }}>
            {props.children}
        </WebsocketContext.Provider>
    );
};

//Exports
export const useWebSocket = () => useContext(WebsocketContext);
export default WebsocketContext;