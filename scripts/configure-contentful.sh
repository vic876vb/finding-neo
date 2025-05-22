#!/bin/bash
contentful config remove --all
contentful config add --management-token $CONTENTFUL_MANAGEMENT_TOKEN --active-space-id $CONTENTFUL_SPACE_ID --active-environment-id $CONTENTFUL_ENV --host $CONTENTFUL_DELIVERY_API_URL
