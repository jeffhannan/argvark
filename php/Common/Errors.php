<?php
// Jeff Hannan

function custom_error_function($error_level, $error_message, $error_file, $error_line, $error_context)
{
    if ($error_level == E_USER_WARNING){
        $json_array = array();
        
        $json_array['result'] = FALSE;
        $json_array['error_message'] = $error_message;
        
        $json = json_encode($json_array);
        echo $json;
    }
    else{
        //echo "heelo";
        echo $error_message;
    }

    die();    
}


?> 

