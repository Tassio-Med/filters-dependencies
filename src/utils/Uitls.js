class Utils {
    static abortRequest(obj){
        if(obj && obj.abort){
            obj.abort();
        }
    }

    static getValue(obj, path, defaultValue = null) {
        const keys = path.split('.');
        let result = obj;

        for(const key of keys) {
            if(result === null || result === undefined) {
                return defaultValue;
            }

            result = result[key];
        }

        return result !== undefined ? result : defaultValue;
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        }
    }

    static geraIdUnico() {
        return `${Date.now()}-${Math.random().toString(36).substr(2,9)}`
    }

    static calcularOffSet(page = 1, limit = 10) {
        return (page - 1) * limit;
    }

    static calcularTotalPaginas(total, limit = 10) {
        return Math.ceil(total, limit);
    }

    static ordenarPor(array, campo, ordem = 'asc') {
        return [...array].sort((a, b) => {
            const valorA = a[campo]?.toString().toLowerCase() || '';
            const valorB = b[campo]?.toString().toLowerCase() || '';

            if (ordem === 'asc') {
                return valorA.localeCompare(valorB);
            }

            return valorA.localeCompare(valorB);
        });
    }

    static filtrarPorTexto(array, campo, texto) {
        if(!texto) return array;
        const textLower = texto.toLowerCase();
        return array.filter(item => item[campo?.toString.toLowerCase().includes(textLower)]);
    }

    static async copiarParaClipBoard(texto) {
        try {
            await navigator.clipboard.writeText(texto);
            return true;
        } catch(err) {
            console.log('Erro ao copiar:', err);
            return false;
        }
    }
    static downloadArquivo(blob, nomeArquivo) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nomeArquivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}

export default Utils;