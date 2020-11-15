import React from 'react';


const details = () = (



    
    <div className="details-users container  " >

    {isLoading ? <ImageLoader

    /> : showResults ? <ImageUser /> : null}


    {isLoading ? <InfoLoader /> : showResults ? <UserInfosSearch />: null}

 


   

</div>
)

        

 


export default details;