<?php
// Jeff Hannan

function loadarglist_check_vars()
{
    $error_message = null;
    
    list ($topic_id_is_set, $topic_id_value) = utils_get_var_numeric("id_topic");
    list ($topic_name_is_set, $topic_name_is_empty, $topic_name_value) = utils_get_var_string("topic_name");

    // Check vars
    $success = ($topic_id_is_set || !$topic_name_is_empty);
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $topic_id_is_set, $topic_id_value, $topic_name_value);
}

function loadarglist_create_json($result_select, $no_of_entries_in_page, $no_of_entries_to_load)
{
    $output_array = array();
    $array_records = array();
    $array_fields = array();
    
    $record_index = 0;
    while($row = mysql_fetch_array($result_select)){
  
        // Fields
        $array_fields['id_argument'] = $row['id_argument'];
        
        // Records
        $array_records[$record_index] = $array_fields;
        $record_index++;
        
        // Only write out $no_of_entries_in_page
        if ($record_index >= $no_of_entries_in_page){
            break;
        }
    }
    $noOfRecords = $record_index;
    
    // Get the argument title. 
    // This is inefficient - it would be better to get this in the original query.
    // Also, have made this a separate loop from mysql_fetch_array($result_select) to keep the branch depth low.
    // Note: & before $array_fields to allow modifying 
    foreach($array_records as &$array_fields){
        // Select the arg record for this id_argument
        $id_argument = $array_fields['id_argument'];
        list($success, $error_message, 
            $arg_title) = tablearguments_get_arg_title($id_argument);
            
        if ($success){
            $array_fields['title'] = $arg_title;
        } else{
            $array_fields['title'] = "Error: Argument id $id_argument not found!";
        }
    }
    // Add to $output_array 2 entries 
    $output_array['array_records'] = $array_records;
    // A flag for more pages. There are more pages if the query managed to load the extra record requested.
    $output_array['more'] = (mysql_num_rows($result_select) == $no_of_entries_to_load);
             
    // There may be 0 or more records
    $json = json_encode($output_array);
    
    return array($json);    
}
    


?> 
