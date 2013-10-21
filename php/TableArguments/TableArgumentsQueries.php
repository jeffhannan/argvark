<?php
// Jeff Hannan
    
// This creates json of a tablearguments record 
function tablearguments_create_json($result_select)
{
    // Create json output
    $array_record = array();  

    // Only using 1 record. The arg should be unique.         
    $row = mysql_fetch_array($result_select);
    
    // Fields
    $array_record['id_argument'] = $row['id_argument'];
    $array_record['title'] = $row['title'];
    
    $json = json_encode($array_record);    
    
    return array($json);    
}

function tablearguments_extract_arg_title($query_result)
{
    $row = mysql_fetch_array($query_result);
    $id_topic = $row['title'];
    
    return array($id_topic);
}

function tablearguments_get_arg_title($id_argument)
{
    $arg_title = null;
    
    list($success, $error_message, 
        $result_select) = tablearguments_select_by_id($id_argument);
            
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tablearguments_get_arg_title"); }    
    
            /*
    if ($success){ list($success, $error_message) = 
        // Check the result for a valid record
        sql_check_result($result);
    }    
    */
    if ($success){ 
        // Check the result for a valid record
        $success = sql_rows_found($result_select);        
        if (!$success){$error_message = utils_create_user_error_message("Argument with id " . $id_argument . " not found.");}
    }
    
    if ($success){ list(
        // Extract the arg title from the record
        $arg_title) = tablearguments_extract_arg_title($result_select);
    }
    
    /*
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tablearguments_get_arg_title"); }  
        */  
    
    return array($success, $error_message, 
        $arg_title); 
}

function tablearguments_get_arg_record($id_argument)
{
    $result_select = null;
    
    list($success, $error_message, 
        $result_select) = tablearguments_select_by_id($id_argument);
       
       /*     
    if ($success){ list($success, $error_message) = 
        // Check the result for a valid record
        sql_check_result($result_select);
    }    
    */
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tablearguments_get_arg_record"); }    
    
    if ($success){ 
        // Check the result for a valid record
        $success = sql_rows_found($result_select);        
        if (!$success){$error_message = utils_create_user_error_message("Argument with id " . $id_argument . " not found.");}
    }
     
        /*
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tablearguments_get_arg_record"); }    
        */
    
    return array($success, $error_message, 
        $result_select); 
}


?> 
