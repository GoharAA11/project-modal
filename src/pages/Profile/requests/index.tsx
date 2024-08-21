import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { getAllRequest,acceptRequest,declineRequest } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"
import { Link } from "react-router-dom"


export const Requests = () => {
    const [requests, setRequests] = useState<IUser[]>([])
    useEffect(() => {
        getAllRequest()
            .then(response => {
                setRequests(response.payload as IUser[])
            })

    }, [])

    const handleAccept=(id:number)=>{
        acceptRequest(id)
        .then(()=>{
           setRequests(requests.filter(elm=>elm.id!==id))
        })
        
    }

    const handleDecline=(id:number)=>{
        declineRequest(id)
        .then(()=>{
            setRequests(requests.filter(elm=>elm.id!==id))
        })
    }


    return requests && <>
        <h2>You have {requests.length} requests</h2>
        {requests.map(elm => <div key={ elm.id } style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img 
                 src={elm.user?.picture ? BASE + elm.user?.picture : DEF} 
          
                 style={{ width: '100px', height: '100px', borderRadius: '70%', marginRight: '20px' }}

                 />
            <Link className="link" to={'/profile/' + elm.user?.id}>  <p>{elm.user?.name} {elm.user?.surname}</p></Link>
            <button onClick={()=>handleAccept(elm.id)}  className="button acceptButton">Accept</button>
            <button onClick={()=>handleDecline(elm.id)}  className="button declineButton">Decline</button>
        </div>)}
    </>

}