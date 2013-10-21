<?php
// Jeff Hannan

include_once("Common/UtilsSQL.php");

// Would only expect 1 row if id found
function tablearguments_select_by_id($id_argument)
{
    $query = "SELECT * ".
        "FROM tablearguments ".
        "WHERE id_argument = '$id_argument' ";
        
    return sql_submit_query($query, "tablearguments_select_by_id");
}


function tablearguments_insert($title)
{
    $query = "INSERT INTO tablearguments (title) ".
        "VALUES ('$title') ";
    
    return sql_submit_query($query, "tablearguments_insert");
}


function tablearguments_title_update($id_argument, $edited_title)
{
    $query = "UPDATE tablearguments ".
        "SET title = '$edited_title' ".
        "WHERE id_argument = '$id_argument' ";
    
    return sql_submit_query($query, "tablearguments_title_update");
}
 
 
function tablearguments_select_by_id_array_string($argument_id_array_string)
{
    $query = "SELECT * ".
        "FROM tablearguments ".
        "WHERE id_argument IN ($argument_id_array_string) ";
        
    return sql_submit_query($query, "tablearguments_select_by_id_array_string");
}


function tablearguments_select_all()
{
    $query = "SELECT * ".
        "FROM tablearguments ";
        
    return sql_submit_query($query, "tablearguments_select_all");
}


function tablearguments_delete_by_id($id_argument)
{
    $query = "DELETE ".
        "FROM tablearguments ".
        "WHERE id_argument = '$id_argument' ";
    
    return sql_submit_query($query, "tablearguments_delete_by_id");
}

?> 
