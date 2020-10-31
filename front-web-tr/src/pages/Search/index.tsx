import moment from 'moment';
import React, { useState } from 'react';



import { userResponse } from '../../core/types/UserInfos';
import { makeRequest } from '../../core/utils/request';
import ImageLoader from './Components/Loaders/ImageLoader';
import InfoLoader from './Components/Loaders/InfoLoader';
import './styles.scss';





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








    const ImageUser = () => (




        <div   >
            <img src={userResponse?.avatar_url} alt="imagem do utilizador" className="image-user" />


            <button className="btn btn-primary btn-search  btn-profile  "  >
                Ver perfil




                </button>
        </div>






    )

    const UserInfosSearch = () => (

        <div className="details-infos-user ">




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
                following : {userResponse?.following}
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
        makeRequest({ url: `/${name}` })
            .then(response => setUserResponse(response.data))
            .finally(() => {

                //finalizar o loader

                setIsLoading(false);


            })



    }

    return (



        <form onSubmit={handleSubmit} >

            <div className="search container">
                <div className="row search-content ">
                    <div className="col-12 ">
                        <h4 className="text-title">
                            Encontre um perfil Github
                        </h4>


                        <div className="input-search  ">
                            <input
                                value={name}
                                //name="name"
                                type="text"
                                placeholder="Usuário Github"
                                className="form-control"
                                onChange={handleOnchange}



                            ></input>
                        </div>


                        <button className="btn btn-primary btn-search " onClick={onClick} >
                            Encontrar


                        </button>







                    </div>




                </div>


            </div>





            <div className="details-users container  " >

                {isLoading ? <ImageLoader

                /> : showResults ? <ImageUser /> : null}


                {isLoading ? <InfoLoader /> : showResults ? <UserInfosSearch /> : null}







            </div>



        </form>






    );

}

export default SearchInfos;


