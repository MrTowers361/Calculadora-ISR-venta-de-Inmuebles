// Valor fijo de la UDI (ajústalo cuando cambie)
const UDI_VALUE = 8.586547;

// --- Funciones auxiliares ---
function parseDate(dateStr) {
    if (dateStr.includes("-")) return new Date(dateStr);
    const [dd, mm, yyyy] = dateStr.split("/");
    return new Date(+yyyy, +mm - 1, +dd);
}

function formatCurrency(val) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency", currency: "MXN"
    }).format(val);
}

function getCompleteYears(saleDate, purchaseDate) {
    const s = parseDate(saleDate), p = parseDate(purchaseDate);
    let yrs = s.getFullYear() - p.getFullYear();
    if (s.getMonth() < p.getMonth() || (s.getMonth() === p.getMonth() && s.getDate() < p.getDate())) {
        yrs--;
    }
    return yrs > 0 ? yrs : 1;
}

function getINPC(dateStr, isPurchase = false) {
    const d = parseDate(dateStr);
    let y = d.getFullYear(), mIdx = d.getMonth() + 1;
    if (isPurchase) {
        if (--mIdx === 0) { y--; mIdx = 12; }
    }
    const m = String(mIdx).padStart(2, "0");
    const years = Object.keys(dataReference.inpc).map(Number);
    const maxY = Math.max(...years);

    if (y > maxY) {
        y = maxY;
        mIdx = Math.max(...Object.keys(dataReference.inpc[y]).map(Number));
        return dataReference.inpc[y][String(mIdx).padStart(2, "0")];
    }
    const yearTbl = dataReference.inpc[y];
    if (!yearTbl[m]) {
        const lastM = Math.max(...Object.keys(yearTbl).map(Number));
        return yearTbl[String(lastM).padStart(2, "0")];
    }
    return yearTbl[m];
}

const dataReference = {
    inpc: {
        "2025":{"01":138.343,"02":138.726,"03":139.161,"04":139.62,"05":140.012,"06":140.405,"07":140.780,"08":140.867,"09":141.197,"10":141.708},
        "2024":{"01":133.555,"02":133.681,"03":134.065,"04":134.336,"05":134.087,"06":134.594,"07":136.003,"08":136.013,"09":136.08,"10":136.828,"11":137.424,"12":137.949},
        "2023":{"01":127.336,"02":128.046,"03":128.389,"04":128.363,"05":128.084,"06":128.214,"07":128.832,"08":129.545,"09":130.12,"10":130.609,"11":131.445,"12":132.373},
        "2022":{"01":118.002,"02":118.981,"03":120.159,"04":120.809,"05":121.009,"06":122.044,"07":122.948,"08":123.803,"09":124.571,"10":125.276,"11":125.997,"12":126.478},
        "2021":{"01":110.21,"02":110.907,"03":111.824,"04":112.19,"05":112.419,"06":113.018,"07":113.682,"08":113.899,"09":114.601,"10":115.561,"11":116.884,"12":117.308},
        "2020":{"01":106.447,"02":106.889,"03":106.838,"04":105.755,"05":106.162,"06":106.743,"07":107.444,"08":107.867,"09":108.114,"10":108.774,"11":108.856,"12":109.271},
        "2019":{"01":103.108,"02":103.079,"03":103.476,"04":103.531,"05":103.233,"06":103.299,"07":103.687,"08":103.67,"09":103.942,"10":104.503,"11":105.346,"12":105.934},
        "2018":{"01":98.7949997,"02":99.17137448,"03":99.49215698,"04":99.15484705,"05":98.99408017,"06":99.37646493,"07":99.9090991,"08":100.492,"09":100.917,"10":101.44,"11":102.303,"12":103.02},
        "2017":{"01":93.60388244,"02":94.14478034,"03":94.72248933,"04":94.83893263,"05":94.72549432,"06":94.96363964,"07":95.32273574,"08":95.79376765,"09":96.09351524,"10":96.69826913,"11":97.69517399,"12":98.27288299},
        "2016":{"01":89.38638139,"02":89.77778112,"03":89.91,"04":89.62527796,"05":89.22561452,"06":89.32402789,"07":89.55691448,"08":89.80933349,"09":90.35774385,"10":90.90615422,"11":91.61683394,"12":92.0390348},
        "2015":{"01":87.11010277,"02":87.27537713,"03":87.63071699,"04":87.40384038,"05":86.96736583,"06":87.11310776,"07":87.24081976,"08":87.42487529,"09":87.75241902,"10":88.2039185,"11":88.68546788,"12":89.04681772},
        "2014":{"01":84.51905163,"02":84.73315704,"03":84.96529239,"04":84.80677925,"05":84.53557906,"06":84.68207224,"07":84.91495883,"08":85.21996514,"09":85.59633992,"10":86.06962558,"11":86.76377787,"12":87.18898371},
        "2013":{"01":80.89278202,"02":81.29094297,"03":81.88743314,"04":81.94152293,"05":81.66882024,"06":81.61923793,"07":81.59219304,"08":81.82432839,"09":82.13233968,"10":82.52298816,"11":83.29226516,"12":83.7700583},
        "2012":{"01":78.34304946,"02":78.50231384,"03":78.54738867,"04":78.30097963,"05":78.05381934,"06":78.41366669,"07":78.85389747,"08":79.0905403,"09":79.43911894,"10":79.84103612,"11":80.3834365,"12":80.56824328},
        "2011":{"01":75.29599135,"02":75.57846024,"03":75.72345093,"04":75.71744095,"05":75.15926438,"06":75.15550814,"07":75.51610674,"08":75.63555502,"09":75.82111305,"10":76.3327123,"11":77.15833283,"12":77.79238536},
        "2010":{"01":72.55204598,"02":72.97167051,"03":73.48972549,"04":73.25556464,"05":72.79397765,"06":72.77118323,"07":72.92919,"08":73.1317495,"09":73.51511019,"10":73.96892635,"11":74.56158125,"12":74.93095445},
        "2009":{"01":69.45614941,"02":69.60949368,"03":70.00995018,"04":70.25499019,"05":70.05035847,"06":70.17935416,"07":70.37051645,"08":70.53888432,"09":70.89271587,"10":71.10719063,"11":71.47604578,"12":71.77185517},
        "2008":{"01":65.35056368,"02":65.5448343,"03":66.01989072,"04":66.17012666,"05":66.09863507,"06":66.3721681,"07":66.74205936,"08":67.12749227,"09":67.58493481,"10":68.04548569,"11":68.81894178,"12":69.29555236},
        "2007":{"01":63.01620793,"02":63.19234663,"03":63.32911314,"04":63.29129513,"05":62.98253436,"06":63.05817039,"07":63.32600481,"08":63.58399619,"09":64.07770259,"10":64.32740509,"11":64.78122126,"12":65.04905568},
        "2006":{"01":60.60362589,"02":60.69635773,"03":60.77251181,"04":60.86161727,"05":60.59067451,"06":60.64299806,"07":60.80929371,"08":61.11960865,"09":61.73661213,"10":62.00651878,"11":62.3318573,"12":62.69242357},
        "2005":{"01":58.30916037,"02":58.50343099,"03":58.76712098,"04":58.97641519,"05":58.82825146,"06":58.77178347,"07":59.00179988,"08":59.07225536,"09":59.30900649,"10":59.45457994,"11":59.88249335,"12":60.25031239},
        "2004":{"01":55.77431735,"02":56.10794476,"03":56.29807094,"04":56.38303195,"05":56.24160294,"06":56.33174451,"07":56.47939018,"08":56.82804118,"09":57.29791705,"10":57.69474717,"11":58.1868994,"12":58.30708815},
        "2003":{"01":53.52544068,"02":53.67412245,"03":54.01293041,"04":54.1051442,"05":53.93055967,"06":53.9751124,"07":54.0533387,"08":54.21548991,"09":54.53823816,"10":54.73820739,"11":55.19254161,"12":55.42981079},
        "2002":{"01":50.90047201,"02":50.86774985,"03":51.12794844,"04":51.40723497,"05":51.51142923,"06":51.76258618,"07":51.91118135,"08":52.1085603,"09":52.42198356,"10":52.65303609,"11":53.07887728,"12":53.3099298},
        "2001":{"01":48.57547625,"02":48.54332816,"03":48.85088778,"04":49.09730863,"05":49.20997046,"06":49.32636377,"07":49.19820196,"08":49.48968755,"09":49.95038115,"10":50.17613537,"11":50.36514891,"12":50.43489879},
        "2000":{"01":44.93083012,"02":45.32938031,"03":45.58068078,"04":45.84001827,"05":46.01137907,"06":46.28392024,"07":46.46446621,"08":46.71978519,"09":47.0610716,"10":47.38513583,"11":47.79028786,"12":48.30767118},
        "1999":{"01":40.46977028,"02":41.01364281,"03":41.39468378,"04":41.77457661,"05":42.02587708,"06":42.3020062,"07":42.58157977,"08":42.82125526,"09":43.23501839,"10":43.50885123,"11":43.89577645,"12":44.33551639},
        "1998":{"01":34.00392411,"02":34.59923784,"03":35.0045334,"04":35.33204206,"05":35.61348136,"06":36.03442041,"07":36.38187811,"08":36.73216103784001,"09":37.32737639,"10":37.86226893,"11":38.53278623,"12":39.47297432},
        "1997":{"01":29.49888603,"02":29.99459809,"03":30.36788907,"04":30.69597181,"05":30.97611945,"06":31.25095691,"07":31.52321104,"08":31.8035022,"09":32.19961259,"10":32.45694082,"11":32.82004201,"12":33.27987432},
        "1996":{"01":23.32975376,"02":23.87426203,"03":24.39982588,"04":25.09344962,"05":25.5508423,"06":25.96690173,"07":26.33603069,"08":26.68607171,"09":27.11275149,"10":27.45116754,"11":27.86708345,"12":28.75933645},
        "1995":{"01":15.3769,"02":16.0287,"03":16.9736,"04":18.3261,"05":19.0920,"06":19.6980,"07":20.0925,"08":20.4329,"09":20.8556,"10":21.2847,"11":21.8096,"12":22.5201}
    },
    taxTable: [
        { lowerLimit: 0.01, upperLimit: 8952.49, fixed: 0, percent: 1.92 },
        { lowerLimit: 8952.5, upperLimit: 75984.55, fixed: 171.88, percent: 6.4 },
        { lowerLimit: 75984.56,upperLimit: 133536.07,fixed: 4461.94, percent:10.88},
        { lowerLimit:133536.08,upperLimit:155229.80, fixed:10723.55, percent:16 },
        { lowerLimit:155229.81,upperLimit:185852.57, fixed:14194.54, percent:17.92},
        { lowerLimit:185852.58,upperLimit:374837.88, fixed:19682.13, percent:21.36},
        { lowerLimit:374837.89,upperLimit:590795.99, fixed:60049.40, percent:23.52},
        { lowerLimit:590796.00,upperLimit:1127926.84,fixed:110842.74, percent:30 },
        { lowerLimit:1127926.85,upperLimit:1503902.46,fixed:271981.99,percent:32 },
        { lowerLimit:1503902.47,upperLimit:4511707.37,fixed:392294.17, percent:34 },
        { lowerLimit:4511707.38,upperLimit:Infinity, fixed:1414947.85,percent:35 }
    ]
};

function calculateISR(salePrice, purchasePrice, saleDate, purchaseDate, isExempt) {
    const years = getCompleteYears(saleDate, purchaseDate);
    const factor = getINPC(saleDate, false) / getINPC(purchaseDate, true);
    
    let salePriceTax = salePrice;
    let updatedPurchase = 0;
    let exentoPesos = 0;

    if (isExempt) {
        exentoPesos = 700000 * UDI_VALUE;
        const diffSale = Math.max(0, salePrice - exentoPesos);
        const pct = diffSale / salePrice;
        salePriceTax = diffSale;
        updatedPurchase = factor * (0.2 * purchasePrice * pct + 0.8 * purchasePrice * pct * (1 - 0.03 * years));
    } else {
        updatedPurchase = 0.2 * purchasePrice * factor + 0.8 * purchasePrice * factor * (1 - 0.03 * years);
    }
    
    const utilidad = salePriceTax - updatedPurchase;
    const annUtil = utilidad / years;
    const bracket = dataReference.taxTable.find(b => annUtil >= b.lowerLimit && annUtil <= b.upperLimit) || dataReference.taxTable[dataReference.taxTable.length - 1];
    const annualTax = bracket.fixed + ((annUtil - bracket.lowerLimit) * (bracket.percent / 100));
    const tax = annualTax * years;

    return {
        utilidad: utilidad,
        tax: tax,
        updatedPurchase: updatedPurchase,
        exentoPesos: exentoPesos,
        salePriceTax: salePriceTax
    };
}

function displayResults(results, mode) {
    document.getElementById("result-mode").textContent = mode === "exempt" ? "Con exención" : "Sin exención";
    document.getElementById("result-sale-price-tax").textContent = formatCurrency(results.salePriceTax);
    document.getElementById("result-updated-purchase").textContent = formatCurrency(results.updatedPurchase);
    document.getElementById("result-utilidad").textContent = formatCurrency(results.utilidad);
    document.getElementById("result-tax").textContent = formatCurrency(results.tax);
let taxDisplay;
    if (results.tax <= 0) {
        // Si el impuesto es cero o negativo, mostramos "Exento"
        taxDisplay = "Exento";
    } else {
        // Si hay impuesto a pagar, lo formateamos como moneda
        taxDisplay = formatCurrency(results.tax);
    }
    document.getElementById("result-tax").textContent = taxDisplay;

    const exentoRow = document.getElementById("result-exento");
    if (mode === "exempt") {
        exentoRow.classList.remove("hidden");
        document.getElementById("result-exento-value").textContent = formatCurrency(results.exentoPesos);
    } else {
        exentoRow.classList.add("hidden");
    }

    document.getElementById("result-card").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculate-btn");
    const resultCard = document.getElementById("result-card");
    const errorMessage = document.getElementById("error-message");
    const loaderOverlay = document.getElementById("loader-overlay");
    const numberInputs = ['salePrice', 'purchasePrice'];

    numberInputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', () => {
            let value = input.value.replace(/[^\d]/g, '');
            if (value) {
                input.value = parseInt(value).toLocaleString('es-MX');
            } else {
                input.value = '';
            }
        });
    });

    calculateBtn.addEventListener("click", function(e) {
        e.preventDefault();
        
        const saleDateInput = document.getElementById("saleDate");
        const purchaseDateInput = document.getElementById("purchaseDate");
        const salePriceInput = document.getElementById("salePrice");
        const purchasePriceInput = document.getElementById("purchasePrice");

        const saleDate = saleDateInput.value;
        const purchaseDate = purchaseDateInput.value;
        const salePrice = parseFloat(salePriceInput.value.replace(/,/g, ""));
        const purchasePrice = parseFloat(purchasePriceInput.value.replace(/,/g, ""));

        let hasError = false;
        if (!saleDate) { saleDateInput.classList.add('error'); hasError = true; } else { saleDateInput.classList.remove('error'); }
        if (isNaN(salePrice)) { salePriceInput.classList.add('error'); hasError = true; } else { salePriceInput.classList.remove('error'); }
        if (!purchaseDate) { purchaseDateInput.classList.add('error'); hasError = true; } else { purchaseDateInput.classList.remove('error'); }
        if (isNaN(purchasePrice)) { purchasePriceInput.classList.add('error'); hasError = true; } else { purchasePriceInput.classList.remove('error'); }

        if (hasError) {
            errorMessage.textContent = "Por favor, completa todos los campos para continuar.";
            resultCard.classList.add('hidden');
            return;
        }

        errorMessage.textContent = "";
        
        // Muestra el overlay
        if (loaderOverlay) {
            loaderOverlay.classList.remove('hidden');
        } else {
            console.error('Loader overlay not found');
        }

        resultCard.classList.add('hidden');

        setTimeout(() => {
            const mode = document.querySelector('input[name="mode"]:checked').value;
            const results = calculateISR(salePrice, purchasePrice, saleDate, purchaseDate, mode === 'exempt');
            displayResults(results, mode);

            // Oculta el overlay
            if (loaderOverlay) {
                loaderOverlay.classList.add('hidden');
            }
        }, 1500);
    });

});
