export function getMoodIcon(_mood) {
    switch(_mood){
        case "Happy":
            return "fa fa-smile-o";
            break;
        case "Soso":
            return "fa fa-meh-o";
            break;
        case "Sad":
            return "fa fa-frown-o";
            break;
    }
}