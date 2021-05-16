class PennyPhraseGenerator {
    static createMergePhrase(object) {
        const { action, url, source_branch, target_branch } = object

        return `Um merge request com status de : ${action} precisa da sua atenção! \n
                Branch Fonte: ${source_branch} \n 
                Branch Destino: ${target_branch} \n
                Favor checar em ${url} \n O nícolas é lindo`
    }

    static createNotePhrase(object) {
        const { project: { web_url } } = object

        return `Um comentário foi feito e espera por você! \n
                Favor checar em ${web_url} \n O nícolas é lindo`
    }


    static createPipelinePhrase(object) {
        const { project: { web_url }, status } = object

        return `O status do pipeline presente em ${web_url} \n
                é de ${status}`
    }

    static generatePhraseByObject(object) {
        const { object_kind } = object

        const mapPhraseBuild = {
            merge_request: PennyPhraseGenerator.createMergePhrase,
            note: PennyPhraseGenerator.createNotePhrase,
            pipeline: PennyPhraseGenerator.createPipelinePhrase,
        }

        return mapPhraseBuild[object_kind](object)
    }
}

module.exports = PennyPhraseGenerator