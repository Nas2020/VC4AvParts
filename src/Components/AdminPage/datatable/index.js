import React, {useState, useEffect} from 'react';
import { Table, Button, } from 'rimble-ui';
import axios from 'axios';

const Datatable = React.memo(({ data}) => {

    const [deleteSucess,setDeleteSuccess] = useState(false);
    const [progress, setProgress] = useState(null);



    async function removeOrganization(organizationId) {
         
         setProgress ('Loading...');
         await axios.delete('/api/organizations/' + organizationId).then ((response)=>{
            
             if (response.status !== 200){
                 alert ('Delete not succees');
                
                 return;
             }
             setDeleteSuccess(true);
             refreshOrganizations() 
         });
         
      

     }

     async function refreshOrganizations() {
        window.location.reload(false);       
        }


console.log(data.length);

    return (
        <div>
     
            {(!deleteSucess) ? null :(<Button variant = 'success' onClick = {refreshOrganizations}> Removed successfully </Button>)}
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Network</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {!data ? null : data.map(dat => ( 
                        <tr key={dat.id}>
                            <td ></td>
                            <td ><img className="org-image" src= {dat.imageUrl} alt="Organization Image"/></td>
                            <td >{dat.name}</td>
                            <td >{dat.network.networkName}</td>
                            <td><button type="button" className="btn btn-danger table-button" onClick = {()=>{removeOrganization(dat.tenantId)}}><i className="fa fa-trash"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
      </div>
    )
});

export default Datatable;
