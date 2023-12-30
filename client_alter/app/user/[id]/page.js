'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function ItemPage(props) {
    const category = props.params.id;
      return (
        <div>
          <h1>the {category} Page</h1>
        </div>
      );
    }
    
  