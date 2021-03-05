import { createStore } from "redux";
import reducer, {lastSearchType} from "../reducers/reducers";

export default createStore(reducer);