<?php

    $dom = new DOMDocument('1.0', 'utf-8');
    $companies = $dom->createElement('companies');
    $dom->appendChild($companies);
    $companies->appendChild(
        $dom->createElement('company')
    ); 
    $companies->appendChild(
        $dom->createElement('company')
    ); 
    for ($i = 0; $i < 4; $i++) {
    }
    echo $dom->saveXML();

?>
