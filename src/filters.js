import { format, parseISO as parseDate } from 'date-fns'
import Vue from 'vue'

Vue.filter('date', value => format(parseDate(value), 'dd/MM/yyyy'))
Vue.filter('dateTime', value => format(parseDate(value), 'dd/MM/yyyy HH:mm'))