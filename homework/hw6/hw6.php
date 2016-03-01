<?php
    require 'hw6.inc';
    $companies = get_fortune_companies();
    $data = xml_encode($companies);
    echo $data->saveXML();
?>
