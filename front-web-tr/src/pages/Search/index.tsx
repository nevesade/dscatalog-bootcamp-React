

//import { type } from 'os';



import moment from 'moment';
import React, { useState } from 'react';
import { userResponse } from '../../core/types/UserInfos';

//import { UserInfos } from '../../core/types/UserInfos';


import { makeRequest } from '../../core/utils/request';
import ImageLoader from './Components/Loaders/ImageLoader';

import InfoLoader from './Components/Loaders/InfoLoader';










/*

type Props = {

    name: string;
}

*/




const SearchInfos = () => {


   

    const [name, setName] = useState('');

    const [userResponse, setUserResponse] = useState<userResponse>();

    //console.log(userResponse);

    const [isLoading, setIsLoading] = useState(false);

    const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {



        setName(event.target.value);



    }

    const [showResults, setShowResults] = useState(false)
    const onClick = () => setShowResults(true)


    const Results1 = () => (

        <div>


                            <div>
                                  <img src={userResponse?.avatar_url} alt="imagem do utilizador"/>
                            </div>

                            
        </div>

    )

    const Results = () => (

        <div>


                          

                            <h5>
                                Nome : {userResponse?.login}
                            </h5>

                            <h5>
                                Repositórios públicos:  {userResponse?.public_repos}
                            </h5>

                            <h5>
                                Localide : {userResponse?.location}
                            </h5>

                            <h5>
                                Membro desde:  {moment(userResponse?.created_at).format("DD/MM/YYYY")}
                            </h5>
        </div>

    )


        

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        

        //iniciar loarder
        setIsLoading(true);
        makeRequest({url:`/${name}`})
        .then (response =>  setUserResponse(response.data))
        .finally(() => {

            //finalizar o loader

            setIsLoading(false);


        })



    }

    return (


       
        <form onSubmit ={handleSubmit}>

            <div className="search container">
                <div className="row search-content ">
                    <div className="col-12 ">
                        <h4 className="text-title">
                            Encontre um perfil Github
                            </h4>

                        <div className="row input-search ">
                            <div className="col-6">
                                <input
                                    value={name}
                                    //name="name"
                                    type="text"
                                    placeholder="Usuário Github"
                                    className="form-control"
                                    onChange={handleOnchange}


                                  
                                ></input>
                            </div>

                         
                            <button className="btn btn-primary  btn-lg my-5"  onClick={onClick} >
                                Encontrar

                             
                            </button>


                       
                          

                          

                        </div>


                            

                             { isLoading? <ImageLoader/> :  showResults ? <Results1 /> : null }
                

                             { isLoading? <InfoLoader/> :  showResults ? <Results /> : null }
                

                    </div>
                        
                        
                        
                          


                    
                      
                     
                            

                      

                        
                        
                        
                            



                        
                                    


                          


                    
                        


                       

                           
                        
                        
















                </div>


            </div>
            


        </form>


            



    );

}

export default SearchInfos;


