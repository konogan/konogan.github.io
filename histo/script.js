let elvisContext;
let elvisApi;
let contextService;
let hitsCount = 0;

(async () => {
  elvisContext = await AssetsClientSdk.legacyElvisContext();
  contextService = await window.AssetsClientSdk.AssetsPluginContext.get();
  elvisApi = await AssetsClientSdk.legacyElvisAPI();
  elvisContext.updateCallback = updateSelection;
  updateSelection();
})();

function updateMsgInPanel(content = "") {
  const panelMsg = document.querySelector("panel-messages");
  if (content === "") {
    panelMsg.classList.remove("message");
    panelMsg.innerHTML = ``;
  } else {
    panelMsg.classList.add("message");
    panelMsg.innerHTML = `
                <h5>${lang.wrongSelectionTitle}</h5>
                <div class='error-text'>
                    ${content}
                </div>
            `;
  }
}

function updateSelection() {
  if (!elvisContext) {
    return;
  }
  let hits = elvisContext.activeTab.originalAssetSelection;

  console.log(elvisContext);
  console.log(elvisContext.hasSelection());
  console.log(elvisContext.hasFilteredSelection());

  hitsCount = hits.length;

  console.log(hitsCount);

  if (hits.length > 1) {
    updateMsgInPanel(lang.multipleSelection);
  } else if (hits.length == 0) {
    updateMsgInPanel(lang.noSelection);
  } else {
    updateMsgInPanel();
  }
  //     var asset = hits[0];
  //     var folderPathArray = asset.metadata.folderPath.split("/");
  //     let assetFond = folderPathArray[1];
  //     let secondFolder = folderPathArray[2];
  //     let thirdFolder = folderPathArray[3];

  //     var assetDomain = asset.metadata.assetDomain;
  //     var pageRange = asset.metadata.pageRange;
  //     var isImage = assetDomain === "image";
  //     var title = isImage ? lang.pdfTitle : lang.imgTitle;

  //     var pdfPromiseResolve;
  //     var pdfPromise = new Promise(function (resolve, reject) {
  //       pdfPromiseResolve = resolve;
  //     });
  //     var imgPromiseResolve;
  //     var imgPromise = new Promise(function (resolve, reject) {
  //       imgPromiseResolve = resolve;
  //     });
  //     var repoPromiseResolve;
  //     var repoPromise = new Promise(function (resolve, reject) {
  //       repoPromiseResolve = resolve;
  //     });
  //     var articlePromiseResolve;
  //     var articlePromise = new Promise(function (resolve, reject) {
  //       articlePromiseResolve = resolve;
  //     });
  //     var webPromiseResolve;
  //     var webPromise = new Promise(function (resolve, reject) {
  //       webPromiseResolve = resolve;
  //     });

  //     if (["PHNPQN", "Ciné fiction"].includes(assetFond)) {
  //       pdfPromiseResolve(0);
  //       imgPromiseResolve(0);
  //       repoPromiseResolve(0);
  //       articlePromiseResolve(0);
  //       webPromiseResolve(0);
  //     } else {
  //       // immagini collegate a PDF (ex CMIA-16)
  //       if (secondFolder == "Archives" && assetDomain == "pdf") {
  //         if (
  //           asset.metadata.publicationName &&
  //           asset.metadata.issueName &&
  //           asset.metadata.edition &&
  //           pageRange
  //         ) {
  //           var publication = asset.metadata.publicationName;
  //           var issue = asset.metadata.issueName;
  //           var edition = asset.metadata.edition;
  //           var path = `${publication}#${issue}#${edition}#${pageRange}`;

  //           elvisApi.search(
  //             {
  //               q: `cf_HistoriqueParutions:"${path}" AND assetDomain:image`,
  //             },
  //             function (data) {
  //               if (data.totalHits > 0 && hitsCount == 1) {
  //                 pdfPromiseResolve(1);

  //                 $("#panel-messages").append(`
  //                                     <span class="accordion active">${title}</span>
  //                                 `);
  //                 $("#panel-messages").append(`
  //                                     <div class="panel">
  //                                         <ul id="panel-img" class="thumb-panel"></ul>
  //                                     </div>
  //                                 `);

  //                 data.hits.forEach((item) => {
  //                   var name = item.metadata.name;
  //                   var path = item.metadata.folderPath;

  //                   $("#panel-img").append(`
  //                                         <li>
  //                                             <a href='#' data-id='${item.id}'>
  //                                                 <img src='${item.thumbnailUrl}' alt='${item.metadata.filename}'>
  //                                             </a>
  //                                             <p>
  //                                                 ${item.metadata.filename}
  //                                                 <br>${item.metadata.folderPath}
  //                                             </p>
  //                                         </li>
  //                                     `);
  //                 });

  //                 initAccordion();

  //                 $("#panel-img a").click(function () {
  //                   elvisContext.openAssets(this.dataset.id);
  //                 });
  //               } else if (hitsCount == 1) {
  //                 pdfPromiseResolve(0);
  //               }
  //             }
  //           );
  //         } else {
  //           pdfPromiseResolve(0);
  //         }
  //       } else {
  //         pdfPromiseResolve(0);
  //       }

  //       // PDF collegati a immagini (ex CMIA-16)
  //       if (
  //         assetDomain == "image" &&
  //         secondFolder == "Medias" &&
  //         ["Argentiques", "Originales"].includes(thirdFolder)
  //       ) {
  //         var paths = asset.metadata.cf_HistoriqueParutions;
  //         var query = "assetDomain:pdf and ";
  //         var index = 0;

  //         if (paths) {
  //           paths.forEach((element) => {
  //             var pdfArray = element.split("#");

  //             if (pdfArray.length == 4) {
  //               if (index > 0) query += " OR ";
  //               else query += "(";
  //               query += `(originPlatform:"${assetFond}" and publicationName:"${pdfArray[0]}" and issueName:"${pdfArray[1]}" and edition:"${pdfArray[2]}" and pageRange:${pdfArray[3]})`;
  //               index++;
  //             }
  //           });

  //           elvisApi.search(
  //             {
  //               q: query + ")",
  //             },
  //             function (data) {
  //               if (data.totalHits > 0 && hitsCount == 1) {
  //                 imgPromiseResolve(1);

  //                 $("#panel-messages").append(`
  //                                     <span class="accordion active">${title}</span>
  //                                 `);
  //                 $("#panel-messages").append(`
  //                                     <div class="panel">
  //                                         <ul id="panel-pdf" class="thumb-panel"></ul>
  //                                     </div>
  //                                 `);

  //                 data.hits.forEach((item) => {
  //                   var name = item.metadata.name;
  //                   var path = item.metadata.folderPath;

  //                   $("#panel-pdf").append(`
  //                                         <li>
  //                                             <a href='#' data-id='${item.id}' data-hp='${item.metadata.publicationName}#${item.metadata.issueName}#${item.metadata.edition}#${item.metadata.pageRange}'>
  //                                                 <img src='${item.thumbnailUrl}' alt='${item.metadata.filename}'>
  //                                             </a>
  //                                             <p>
  //                                                 ${item.metadata.publicationName}
  //                                                 <br>${item.metadata.issueName}
  //                                                 <br>${item.metadata.edition}
  //                                                 <br><br><em>folio</em>: ${item.metadata.pageRange}
  //                                             </p>
  //                                         </li>
  //                                     `);
  //                 });

  //                 initAccordion();

  //                 var single = function (e) {
  //                     elvisContext.openAssets(e.currentTarget.dataset.id);
  //                   },
  //                   double = function (e) {
  //                     var query = `cf_HistoriqueParutions:"${e.currentTarget.dataset.hp}" AND assetDomain:image`;

  //                     var first = true;
  //                     contextService.openBrowse("/", true);
  //                     var unsubscribe = contextService.subscribe((data) => {
  //                       if (!first) {
  //                         unsubscribe();
  //                       }
  //                       contextService.openSearch(query);
  //                       first = false;
  //                     });
  //                   };
  //                 var clicks = 0,
  //                   timeout;

  //                 $("#panel-pdf a").click(function (e) {
  //                   clicks++;
  //                   if (clicks == 1) {
  //                     timeout = setTimeout(function () {
  //                       single(e);
  //                       clicks = 0;
  //                     }, 250);
  //                   } else {
  //                     clearTimeout(timeout);
  //                     double(e);
  //                     clicks = 0;
  //                   }
  //                 });
  //               } else if (hitsCount == 1) {
  //                 imgPromiseResolve(0);
  //               }
  //             }
  //           );
  //         } else {
  //           imgPromiseResolve(0);
  //         }
  //       } else {
  //         imgPromiseResolve(0);
  //       }
  //     }

  //     Promise.all([
  //       pdfPromise,
  //       imgPromise,
  //       repoPromise,
  //       articlePromise,
  //       webPromise,
  //     ]).then((values) => {
  //       sum = values.reduce(function (a, b) {
  //         return a + b;
  //       }, 0);

  //       if (sum == 0) {
  //         $("#panel-messages").addClass("message");
  //         $("#panel-messages").html(`
  //                     <img src="../common/img/links_plus_grey.svg" class="icon">
  //                     <h5>${lang.noLinksTitle}</h5>
  //                     <div class='error-text'>${lang.noLinks}</div>`);
  //       }
  //     });
  //   }
}