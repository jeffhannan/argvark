<?php
// Jeff Hannan

function sql_create_command_error_message($command)
{
    $message = "Error performing SQL command: <br>" . "$command" . "<br>" . @mysql_error() . "<br>";
    
    $error_message = utils_create_site_error_message($message);
    
    return $error_message;
}

function sql_create_query_error_message($query)
{
    $message = "Error performing SQL query: <br>" . "$query" . "<br>" . @mysql_error() . "<br>";
    
    $error_message = utils_create_site_error_message($message);
    
    return $error_message;
}

function sql_database_connect()
{
    $success = FALSE;
    $error_message = null;
    
    // Defines are set in mysql_connect.php
    
    // Open connection to database
    $connection = @mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
    if (!$connection) { $error_message = sql_create_command_error_message("mysql_connect"); }
    
    // Select database
    if ($connection){
        $success = @mysql_select_db(DB_NAME);
        
        if (!$success) { $error_message = sql_create_command_error_message("mysql_select_db"); }   
    }  

    return array($success, $error_message, $connection); 
}

function sql_close_script($connection, $success, $json, $error_message, $output_error_message)
{
    // Last step is to close the connection
    if ($success){
        $success = @mysql_close($connection);
        
        if (!$success) { $error_message = sql_create_command_error_message("mysql_close"); }   
    }
    
    // Finally, produce some output to return from the script
    if ($success){
        // If all succeeded, should have json output
        echo $json;
    } 
    else if ($output_error_message) {
        // If failure somewhere in the script, output the error message              
        echo ("$error_message");
    }
}                       

function sql_submit_query($query, $caller)
{
    $success = TRUE;
    $error_message = null;
    
    $result = @mysql_query($query);
    if (!$result){
        $error_message = sql_create_query_error_message($query);
        $error_message = utils_prepend_error_message($error_message, $caller);   
        $success = FALSE;
    }
    
    return array($success, $error_message, $result);
}

function sql_no_rows_found($query_result)
{
    $num_rows = mysql_num_rows($query_result);
    $no_rows_found = ($num_rows == 0);
    return $no_rows_found;
}

function sql_rows_found($query_result)
{
    $num_rows = mysql_num_rows($query_result);
    $rows_found = ($num_rows > 0);
    return $rows_found;
}

/*
function sql_check_result($query_result)
{
    $error_message = null;
    
    // Check there is a row to read
    $success = sql_rows_found($query_result);
    
    if (!$success) {
        $error_message = utils_create_user_error_message("No records found."); 
        $error_message = utils_prepend_error_message($error_message, "sql_check_result");   
    }
    
    return array($success, $error_message);
}

function sql_check_result_empty($query_result)
{
    $error_message = null;
    
    // Check there is no row found
    $success = sql_no_rows_found($query_result);
    
    if (!$success) {
        $error_message = utils_create_user_error_message("No records found."); 
        $error_message = utils_prepend_error_message($error_message, "sql_check_result_empty");   
    }
    
    return array($success, $error_message);
}
*/

function sql_get_last_insert_id()
{
    $id = null;
    
    $query = "SELECT LAST_INSERT_ID()";
    list($success, $error_message, $result) = sql_submit_query($query, "sql_get_last_insert_id");
    
    if ($success){ 
        $row = mysql_fetch_array($result);
        $id = $row['LAST_INSERT_ID()'];
    }
    
    return array($success, $error_message, $id);      
}

// Quote variable to make safe
// http://www.nusphere.com/kb/phpmanual/function.mysql-real-escape-string.htm
function sql_quote_smart($value)
{
    // Stripslashes
    if (get_magic_quotes_gpc()) {
        $value = stripslashes($value);
    }
    // Quote if not a number or a numeric string
    //if (!is_numeric($value)) {
        //$value = "'" . mysql_real_escape_string($value) . "'";
        $value = mysql_real_escape_string($value);
    //}
    return $value;
}


?> 

