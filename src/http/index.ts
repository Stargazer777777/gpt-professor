import axios from "axios";
import {apiKey,organization} from '@/tmp/index'
axios.defaults.headers['Authorization'] = 'Bearer '+apiKey
axios.defaults.headers['organization '] = organization
