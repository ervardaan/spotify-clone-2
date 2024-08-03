import React, { useEffect } from 'react';
import styled from "styled-components";
import {AiFillClockCircle} from "react-icons/ai";
import {useStateProvider} from "../utils/StateProvider";
import axios from 'axios';
import {reducerCases} from "../utils/Constants";
export default function Body({headerBackground}){
  const [{token,selectedPlaylistId,selectedPlaylist},dispatch]=useStateProvider();
  useEffect(()=>{
    const getInitialPlaylist=async()=>{
      const response=await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{
        headers:{
          Authorization:"Bearer "+token,
        },
        }
      );
      const selectedPlaylist={
        id:response.data.id,
        name:response.data.name,
        description:response.data.description.startsWith("<a")?"":response.data.desciption,
        image:response.data.images[0].url,
        tracks:response.data.tracks.items.map(({track})=>({
          id:track.id,
          name:track.name,
          artists:track.artists.map((artist)=>artist.name),
          image:track.album.images[2]!=null?track.album.images[2].url:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABwEGBAUIAgP/xABMEAABAwMBAwUKCggFAwUAAAABAAIDBAURBgchMRITQVFhFCIyYnGBkbHB0RUjQlJVc5KhstIWFzQ1NnJ0lDNDU1TwJUThJEVjhPH/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADERAAICAgEDAgQFBAMBAQAAAAABAgMEEQUSITFBUQYTIjIUYXGhsTNCUpEWI9GBFf/aAAwDAQACEQMRAD8AeKAEAICCUBDnAAknAHEoBfaw2j09tMlHZwypq27nSnfGw+0qJbkqPZF/x/Bzv1O3tH92KW5XCsudU6quE8k87vlPPDsA6B5FXynKb22dhj49ePDprjoxScrEkaIQEtwTjfnoQ8ckltmzorBdq7HctsqZAeB5BHrWyNU5eERLOQxqvumbqDZxqWYZ7jjj7JJQFsWLYQZ8/hx8NmW3ZbqEjeaQHq5xZfhJmr/keL+Z85dmGo2eBHSv8k2PWvHiWHq+IcR+d/6NZW6I1FRAmW2SPA6YyHBYPHsXoSauZw5/3mlqaSaleWVUEsL+p7SFrcWvKLCu+qz7HsxwsTamGUPQ47iMjqQ8a2XDSevLnYXNp6hz6yg/03uy5n8pPR2KTVkSj2fgo+Q4WnI+qHaQ47DfKG+0rKm3zh7SO+adzmnqIVjCyM1tHGZOLbjz6ZrRtVmRwQAgBACAEAICMoD5VEzIInyzSMjiY3Je44A7SvG0ltnsIyk9JCd1xtAmuZkobNK6KjBw+UbnS+4KvvyOrtHwdjxfCRr1Zetv29hf8FDOlSS8E7yvD0+9HR1NfUNp6KnknmdwZG0krNRlLwjTbdXUuqxpDB0/srqJ2smvlRzDTv5iHe7yF3D0KXXib7yOay/iNJuNC3+YwbPpKx2lgFJb4uV/qSDluPnKmRqhHwjnr+Rych7nNm8awNAa0AAdAWwib2ThDwnCAMICMIDGq6CkrGFtVTRTNPEPYCvHFPybIWzr+16Kbe9mVmrQ6Sh5VDMd45Byz7J9ijzxYPwW+Pz+TV2sfUv3FrqHRt4sBc+opzNTD/uIRymj+YcR59yg2UTgdRhcvj5Wknp+zK9uO8cOtadFomn4IyUPTYWS8V1lrW1VumdG8Hvm8Q8dRCzhZKD2iLlYdWTBxmh4aM1hR6mpsBwgrYx8bA4/e3rCtKrlYvzOC5DjrMSevK9GWdbiuBASgBACAEB85Xtjjc97g1rRkknGAvN68nqTb0hK7Q9ZyXmd1vt8hbQRnD3N/wA4+5V2Re5Ppj4O14bilQldavqfj8iiqIdESMdPBDxlt0Zoes1Fipld3PQA453G+THEN96kU47n3fgpOS5iGJ9Ee8v4HLYrFbrFS8xbqdkY+U/GXO8pVjCuMF2OLycq7Il1WPZs1sI5IQEoAQAgBACAEBCAgtaQQQCOohH38jw9i/1ds4pLkH1Nn5NJVHe6PGI5PN0FRbcVS7xL7A5y2j6bfqQo7hQ1Fuq5KWtgfDPHucxw+9V0ouL0zsqL4XQU4PaZirEkGTb66pt1ZFV0czo5ozlrh6vIsoycHtGi+iF8HXNbQ+9F6og1JQCQcmOrjGJoc8D1jsKtabVZE+e8hgTxLdPx6MsYW4gEoAQAgIKAVe1PVroy+xW+TDsf+qkb0eIO3HHyqDlXf2o6fg+N21kWePQVnQq87EEABDxls0RrCfTlQIpg+W3yu+MjzvYfnN83QpNF7ren4KXleKjlx64dpr9x5UFVBXUzKmklbLDIMse3gQrRNNbRwk4Srk4yWmjKXpiCAEAIAQAgBACAEAICDwQFf1Xpii1HR83UNDKhv+FM3i0+5araVYtE7Bz7MOzcfHsIm+WeqslfJRVzA2RnguHB46wqqyDg9M7/AA8uvKrVkGa4cVgSzY2G81VjucVdRu75hw5hO57ekFbK7HCW0Q8zDhlVOEjoWxXWnvVuhr6R2YpW55J4sd0g9oO5W8JqUdo+dZGPPHsdc/KNisjQSgIygK9rW/s09Y5apuDUP7yBp6XHp83FarrFCOyfx2G8vIjD09Tn2WR8sj5ZZC+SQlz3Hi4k5JVQ229s+i1xUIqK8I8DOVibDeWzS10udnqLnSQF8MB5ODxk+dyevC3RplKPUisv5THovVMn3ZoyMZGDu4rUWUWmtoAgfsWvQ+r5tN1XNzF0lvkPxkY+QfnN9ykUXOD0/BTctxccuPXBfWh5W+spq+ljqqSRskMrQ5rm8CFaKSa2jhJ1yqk4SWmhf7VtZ3KwT0lBaHthlmYZJJiwOIAOMAHcvTAXg2jaxwP+tvH/ANaH8iAn9Yusfpt/9tB+RAH6xdY/Tb/7aD8iAP1i6x+m3/20H5EAfrF1j9Nv/toPyIA/WLrH6bf/AG0H5EAfrF1j9Nv/ALaD8iAP1i6x+m3/ANtB+RAQdouscH/rkg7RTQfkQDV2XanrtSWmo+E+S+ppZBGZWM5POAjIJHQfIgNrrHTFPqS2mJ+GVUYJgl+aeo9hWq2pWRJ2BnTw7eqL7eogq6lnoaqWlq4zHPE7kvaeIKqHFxemfRKboXQU4eGfAceC8Nr0+xdtl2ozZ7v8Hzv/APR1jhx4Mk4A+fcFLxbemWmc/wA7gq6r5sfuj/A7m43qyOIPSAgkdaARO0u+m73+SCJ2aWkPNswdxd0lVeTZ1T0ju+Dw/kY/W13kVAcVGLzsvJtNN2We/wB3hoICWl+98gHgNHErZVX1y0Qs7LWJQ7JeToe30MFvooaOljEcETQxrR1BW8Y9K0j5xZZK2bnPyxc7RtCc5zt3s0Z5Q76enYPC8Zo6+xRMjH39UTo+I5dw1Te+3uKro3cFXnYRe+68AEPX7Fq0Nq+p07ViKXMltkPxkfSzxm+5SKL+h6fgpeV4pZceuC1JfuZ+2Nj6+ott7o8T2x8BZ3Qw5a1xIIB6lZxkpLaOFsrlXJxktMXAwsjAEAIAQAgBACAEAHggHFsH/d91+uZ+FANF3AoBb7WNMd1Unw5Rs+PgbioaB4bOg+UepQ8mnf1I6PguQ+XP5EvD8CiOfMq47Ulji14LThwOQeop47mMkpLT8HQGgb6L7p+GaQjuiL4uYZ6R0+dW9FnXA+c8nivGyHH0fgsuQOkLcV5o9YXYWbT1XV5AeGclmTxcdwWu2XRFsmYGP8/JjA52c4vJc4kuccuJ6Sqbfc+lQgoxSXoeR2oZDq2T2H4Os7rhO0CorMEZG9rBwHtVni1dMdnB87m/Pv6IvtEvqlFGQRuQCv2jaD50yXezRAO3uqKZo8Lxm9vWFCyMff1QOm4jmXDVN/j3FURjoxjrVfo7CLTW0A3Lw9ZZNKalFq5yguMXdVnqu9npzvDc/KCk0Xut6fgpeV4qOXHqj2mjE1lpb4GDLhbJe67LVb4Zhv5BPyXe9Wiaa2jhrK5VycZLuVjPXvXprDKAMoAygDKAMoAygAoBxbB/3fdvrmfhQDTQHzmiZLE+ORocx4wQekLxraPYycXtHOurrK6w32poyDzXK5UR8U8FUXQ6JaPo3GZayaFP19TTDcQtRYl62SXfuG/uoXvxDWNwAT8sf+PUpeJPplo5z4hxfmUK1eUOo56ArJdjitiu203E8i32xpIDiZn7+rcB6SfQoOZP+06f4bo3OVr/AEFYoB2JnWG3Put5pKFn+dKGnydP3LOuPVNIiZ16oolN+iOk6aBsEEcMbeSyNoa0dgV0lpaPmkpOcupn1QxJQHlwzuwgFhtG0Fzoku1mi7/wp6dnyvGb2qFkY+/qidNxHMODVN/j0YqTn/8AVXnYRe12Bpwh7+hY9K6mFoElFcYRV2ip3TUzxnk5+U0exSKL3W+/gpeV4qGVHqgtTX7jWodHaOrqWOppbTRywyDLXtbxCtItNbRwtlcq5OM13RkfoFpU/wDslJ9lemBP6A6W+hKT7KAP0B0t9CUn2UAfoDpb6EpPsoA/QHS30JSfZQGt1HonTVLYbjUQWimjlZTvc14bvBAQHP7TmME8eSEA5Ng/7vu31zPwoBpoCCMhALXbLaDNbqa6Rs7+B/Nyfynh96h5kNx6jo/h3JcbnU/UURVcdofegqnUNbT1cZIfBI2QY7DlZQlqSZpya1bVKD9UdMUs7amlhnjPeysDx5xlXUX1LZ8wsqcZuPsIzafWmq1jWDOWwBsLR5sn1qrypbs0d5wVXysNS9+5U1HLov8Aset4qNQT1h3tpou98rv+FTMOO5bOb+JL+mpQXqOgKxOLJQAgBAQ4ZQCu2i6D50y3eyxfGb3VFO0bneM3t7FCyMdP6onTcPzEoapufYVThg792/GDxVedgmtdvABDItOh9Xz6bqublLpLfIfjI/mH5zfcpFF7ren4KTleKjlx6oLU/wCR6UFbT11JFU0kjZIZG5a5vBWcWmto4WyuVcnGS7mTlZGBKAEAIDUat/hi6/0z/UgOXm+APIgHLsH/AHfdvrmfhQDTQAgNRqqgFz09X0p4vhcW+UbwtdseqDRKw7nTfGa9zm9wI3HiNypmfTIvaTIHSF4esf2zeu7s0dQOe7Lo2mIk+KSFb4891o+dctV8rLmvfuJG/wA5qb7cpnnJfVSYPZyjj7lW2PcmzusGHRjwj+Rr1rJg4NitMG2ivqcDlSVIZnsa0e9WOGl0bOJ+I5t5EY+yGQphzoIAQAgBAeXAYyUPGK7aJomOeWa42VrTVNbzlRSN4uHzgFCyMff1ROm4fmHW1Td3XoxVnyqvOyTWl3Dh5UPS06J1jUabqhFJmS3SH4yPpb4zfcpFF7g9PwUvK8XDKg5x7TX7j0oK2nr6SKppJWywyNy17eBVommto4WyqdcnCa00ZQ4L01ggBAajVv8ADF1/pn+pAcvN8AeRAOXYP+77t9cz8KAaaAEB5cAWkHgUBzPfKcUl4rqYf5VTI30OVJYtTZ9OwpdePCXukYI4rAksZuzK7tpLBPBK497VO5OOgFrT68qZTPpjo5flsN2ZPUvYWkjzI9z3cXOLj5SVE33OoSSWkeUPR4bH4wzRzHDjJUyE+kD2K0xF/wBZwPPveZ+iLwpJSggBACAEBB6kAn9rF2rLHrW119ulLJo6UgjO6Qcod64dIQGBc7dRavtst/07EI66PfX2/wCUD0uaFCycff1ROl4fmHXqi7w/UpDuO/OeG/oVedipLSDONy8Mi06H1fPpuq5uTlSW+V3xkY+QfnBSaL3W9ehS8rxUcqHXH7l+49aGtp66kjqaSQSxPALXNPFWkZJraOEsrlXJxktNGQDlemBKA1Grf4Yuv9M/1IDl5vgDyIBy7B/3fdvrmfhQDTQAgPJ4IeM5210wR6wvDR/uS707/aqe/wDqM+kcS94df6GiWosTOoLjJRxOjYXYc7lbvIB7FkpaNMqVJ7ZhPaWOLTxBIKxNu+2yOCHrHjshcHaOiaPkVEoPpz7Va4v9M4Dn1rMf5ou6kFMCAEAIAQEdKASW3HdqSgx/tT+IICj2C61tlu1PWW+Z0cocGO6ntJ3tcOkIBrbRdCCXnLrZIRz2909O35fW4DrULIx9/VE6Xh+Xdf8A0Wvt6CoIwcH71Xs7FPegzjdv8yHrRadE6vqNNVQZJypaCUjnYs72+M33KRRc63p+Cm5Xi45cOuK1ND0oK6nr6SKqo5WywStDmPaeIVpFpraOEsrlXJxktNGUvTA1Grf4Yuv9M/1IDl5vgDyIBy7B/wB33b65n4UA00AICCNyBnO2vHB2sruR/uCPQAFT3/1GfRuJWsOv9DQrUWRkQUsk7C5gyAccENcp9L1o+t4hMF3r4HAjm6mVvocVlNak0asSfXRGXuYRWBJY49i1QHWGsp+mOq5XHoc0e5WeG9w0cP8AEcNZMZe6GKpZz4IAQAgBAR0oBI7cv4kt/wDSn8QQC8g/aIfrG+sIDrAjJQCx2jaEEolu1kiPPeFPTt4P63NHWoWRj7+qJ0vD8w4NUXPt6CoI346RuVedipbWwzhDLXfZadE6vqNOVnIkLpLfKfjY/mn5zfat9Fzren4KXleLjlx6l9yHpQ10FfSx1VJI2SGQZa5pVopKS2jhLK5Vy6ZLTMLVv8MXX+mf6lkYHLzfAHkQDl2D/u+7fXM/CgGmgBAeXHCA5q1FOKq/XGoHCSqkcPtFUtr3Nn0zAg4Y0I/kjXt471gTBgbPLN3fZqiZwP7U5o3Z3chik1V9UdnPcjmum/p/I0u0ekNJrG4t3ATOErfI4e8FY5EdWMlcLb8zCivbsVhaC3GNsXrhDdqyicf8eIOb2lv/AIKm4b7tHLfElLdcLPYcSsDkAQAgIKA8vkbG1znua1rd5cTgAICr3LaJpe3yOjfc2zPbuLadhk3+bcgFJtM1Jb9TXejq7WZTFHAWO5xnJOc54ICpwftEP1jfWEB1kgPJCAWO0TQfPc7d7LEBKO+ngaPD7R2qHkY+11ROl4flvltU2vs/UVGN+MHzquZ2MWmk/QM43Ie6LTonV9Rpqq5uQOmt8h+MiHFvjN9y303ut6fgp+U4qOXFyj2mM3WeprdFpGWoDpJaavhcyKaJnKaHEYAJ6MnrVrGSktrwcHZXKuTjNaaOeWtLW4cDkDBx1r0wHJsH/d92+uZ+FANNACA12oKxtvstbVvOBFC4+fG5YWPUWzdj1uy2MV7nNUjuW9zjxc4kqlb2fUIx6Vr2ICGXqPbZhRdz6Ooy8d9M58vmJ3fdhWuPD/rR895q35mZLT8diqbaLcW1NvuTR3j2mF57RvHtWjNj4kWvw1empVP9RZqCdabjSlzNp1FQ1vyGSAPA+adxWymfRNMgcljvIxpQXsdGRvD2tc05ad4PYrk+bPye0AHcgNRqbUNFpy1yV1e/AbujYPCkdjc0D/mEAgdWauuuqJ3d2yujo895SRvPIH83zj5UBoOAAG7HUEBPRhAeoP2iH+dvrCA6yQAgILQeKAWO0fQvPiS7WWLEoBdUQNHhjrb2qFkY+/qidLw/Lut/Jufb0FORjORhV52KltbDJQ917li0pqP4IMtFXxCqtNUeTUU7hkDPygOv3KRTd8t6fgpuU4uOXHqj2mv3PhrHSfwS2O5Wl5qbNU4MUrd5j8V3vVnGSktnC2Vyqm4SXdF42D/sF2+vZ+FZGsaiAg8EAv8Aa/du5bCyhYfjKqQZ/lHFRcqfTHXuX3AY7syPmf4iYVYd0fSnhfUTxwRf4krwxvlJwPWvYrbSNd01XBzfojpa3UraK301K3IEMTWYHYFeQWopHy6+5Tscn69zT6/tHwxpiqhY3MsQ52Pyhab49UGibxeT+Hyoyfg5+6O31KoPoye1tAOO9DIe+zK+C76fZE9+aik+LkB446D6FbY9nXA+ecxiPGye3h9y3reVQO4IDnfadfJL1qqpZzhNJRnmIGdGR4TvKSceZAVPpQAgBAZNtppKy6UVLAC6WadjGtHa4IDqxACAEBUNpWpZdMWNtRSc2ayeURwiQZHWSfMPvCAX9yt9DrC2yX3TsYjr4hmvt7eOfnNH/MqHkY+11xOl4fl3W1Te+3oyj8D3wwM+hVx2Klvv6MAd/tQy0WLSupTaDJRV7O6bRU97PTO34B6WrfTe4PT8FLynFRy49Ue0/wCRpbObBSWWCtqLXVipt1dI2WlPymMx4B6yOHX171axkpLaOEtrlVNwmtNFzXpgeXHAJPAIDn7X98F81DNJG7MEPxUXUccT6VU5FnXI+g8Nifh8db8vuVtaC3b7Fw2XWj4S1PHM9vKhpBzrj43yVJxYdU9lFz2V8rG6E+8h6b1anCaAta4EEZBGCvBvRz9r2yGx6hqImjFPMTLCew8Qqm+vomfQuHy1kYy35XYrfFaC2LDorULtO32KpcT3NKObnHi9B83vW7Hs6Jd/BVcrhLKo16o6CglbNGyWNwcx4y1wO4hW6e1tHz2UXF6l5Po4ZBGcZQ8OWL1BJS3qvgmBEjKmQHPHwj70BhIAQATgZKAamx/SM3dDdRXKJ0cbQW0cbhguJGC/1gec9SAcA4ICUAIBV7d4ZHUFona0mNk0jHHqLgMeooBV2a61lkuUVwt0hZNHu3nc8fNd2IC8XKgo9ZW+S+6eYIrhG3Ndbxxz0uaFDyMff1ROk4jl/laqufb0KRggnlDHsVczsk9oBxHBDItGiNW1Gm6wMeTJbpHZliPFp+c3t6wpFFzren4KblOMjmR64fch6UFbBX0kdVSStlhkGWuCs4yUltHCW1Tqm4TWmio7T9S/BFpNDTSAVtW0tbjixnS5aMm3oWi24XAeRd1y+2Ikd3JwOHQqs71JegN86aEta7j12ZWL4I0+2WdoFTVnnX9g6B6Fa49fRA+f8zmficl68IuOApBUEnggKftH078OWJzqZmaylzJEOlw6W+haMirrjsteIzfwuQt+GIk7s5BBB6unqVS1ryfQYyUl28EAoZDQ2W6vEYjsVxfhv/ayOPDxD7FPxr/7WcjznF93kVL9RqF3apxyouNo2zp98qzdrK5jK5zcTwvOGzY4HPQ7o7UAqazTV+on83U2auaesQFwP2coDItujdSXJ4ZTWeqaD8udvNtHlJQDJ0jspp6CVlZqGVlXO3BbTRg8209vS5AMyNrWsDWgBo3ADgEB7QAgBAazUNnpb9aqi21zSYpRucOLSODh2goBEX/Z3qCzTuDaR9fTAnkT0wycdHKbxB+5Aa+wxaltV1irLXbbjHVMyADSPAeOp2RwKAvmqNJ1F4tQv9Ja5LfXlvKq6B+Mk9Lm4JUPIx9/VE6XiOYdTVNz7ejFt2YIxxyFXM7GMlJbXgM79+UMtJ9mWbRmrqrTdQWHM1FJ4cOeB6wt9N7r8+Cn5LioZq6l2kam93WpvVzmuFU7Mkh4dDB0NC12Tdktsm4eLDFp6II1/lWBKbLRs+086+35nLae46bEk7ujsb51vx63OWyo5nOWNS4x+5j8jaGjDRgDcB1K2/I+f72ekBKA8uAxwQCY2n6UNtq3XagixR1DsytYN0b+vyFV2VTp9SOy4LkvmR+RY+68foUBQzpSWkh3Ka4tI3gjiEXY8mlJfUODZ9rtlcyK13iUMrGjkxSu3CUdXlVjRkdS1I4rluHdMnbUvpGGzHlUw54+iAEBGB1ICUAIAQAgBACAEBDuCAWW0TQYqGyXayQ/HgF09Owbn+MO31qHkY+/qidJxHMOt/Jufb0YpnAt3O3OBwfKq7R2SaaTT8kIZAvWGZNvpKivq46WkjMk0p5LWj29i9jFyekab74UVuc32R0Fo/T8GnbRHRxtaZj388uN73e4cAreqtVx0fOc7Mnl3OyX/wA/I3gWwhkoAQEFAY9bSwVlLLTVLA+GVpa9p6QV44qS7mVdkqpKcXpoQ2tdKT6ZrcDlPoZSeYk6vFPaFVX0uuXbwd/xXJRy4dMvuRWVoLfsemnfnJBG8EdBTwYySa0xj6L2jyUgbQ35zpYG7mVIGXNHjdY7VNpytdpnLclwKe7KP9DXo6mGsgZPSysmheMtew5BCnrT7o5SUJQl0yWmZC9MQQAgBACAEAIAQAgIQFY1VrO3aejMcj+frCO9p4zv8/UtFt8YeSxweMuy32Wl7iLulc+5XCorZY443zv5ZZGMBqrJy65dR32LQqKlXvejEWHYkkxsdJI1jGlz3HDWjiT1L1JvwYTkoxcm+yHds70c2w0/dtaA64zN3/8AxN+aO1WePSoLb8nB8vyjyp9EftRd2qSU2iUAIAQAgII3IDCuttpbrRSUddE2SCQYc0+sLyUVJaNlV06ZqcX3EbrLR9Zpucva101vefi5wPB7HdRVXdRKt9vB3nGctXlx6X2mVgqOXADpyh4za2DUVz0/MZLbUFjXHv4n743eULZXbKHgg5nH0ZcdWR7+4z9P7UbdWBsV3jNFNuHLHfRu7c9HnU6vKjLycrmcBfS91vqReqOtpqyPnKSeOVh4FjgVKTT8Mo51zg9SWjIyvTAAgJQAgIXgILgBvIGF6DQXrV9lszT3VWMMn+nH3zj5gtU7oR8sm4/HZF71CItdRbTrjcA6G1x9wwH5ZOZT7B96h2ZcpdonT4fw/VVqV76n7FFc4ve57nFznHJc4kkntyobb9ToYwUVpLSPCGSPrTU81VUMp6aJ0s0hwxjRkkr2KcnpGu22FUHKb7Dm0DoVlka2vuQZJcSO9bxEI9pVlTj9C2/Jw/K8u8p/Lr7R/kvbRjrUopPQ9IAQAgBACAEBCA+NVTRVUD4aiNskbxhzHDIIXjSa0zKE5Qe4vQqNY7NZ4C+s0+0yQnJdTZ75g8Xr8igW4vrE6vjudTSryPPv/wCi3e1zHuY5rmvacOa4YIPaFCaa8nUwnGa3F7POD1LwyJBwOGUBkUlZU0T+XSVM0DhvBjeQs1OUfDNFuNTb98dlloNo2oaNrWOqW1DR/rMyfSt0cmcSrt4HDn9q0zeU+1ura0d0W6J56S1xC2rM/IgT+GY/2zMobXmY32l2frVl+M/I1f8AGpf5nmTa67HxVqA/mkXn4z8jJfDPvM1dbtUvMxIpYaanaeBwXELCWZJ+ESavhyiP3PZW7nqm93Mnuu4TFnzGO5I+5aZXTfqWdHGYtP2wNP1knJPEneStTe/JPjFRWkeUMg4cQgZuNOacueoqjm7dAebBAfO7cxnn6T2LbXTKfgr83kaMSO5Pv7Dq0no6g03EHRN56rI7+ocN/kHUFZVUxgvzOIzuSuy5fV2XsWUBbiuJQAgBACAEAIAQAgBAeSMoCu6i0dadQNL6uDm6nGG1Ee5w9/nWqymEyfh8lkYr+iXb2YsNQbOLxbC59G3u6nG/MY78DtCgWYso+DqcPnse1as+llOnikhk5EzHRuG7kvGCo7TXkvYWRmtxe0eMFeGZCAMLwAvQC8AIAXoDBHFDxG0tOn7rd5Q230Uso6XuGGjzlbIVSn4IORn42Mvrl3GRp3ZZTwcme+zc+/j3PGcM854lTa8RL7zmsz4gsn2oWvzGHS0sNHBHBSxMihjGGxsGAApaUY9kc9OyVknKT22ZC9MCUAIAQAgBACAEAIAQAgIO5ACAgjduQGuuljtl1jLa+ihmz0lu/wBKwlCMvKN9OTdS9wk0U65bKLVOS6gqZ6Vx4NOHt+/f96jSw4vwy4p+IciC1OKf8lbrNlF5iB7lq6WoHRnLD7VpeHL0ZaV/ElL++LRqJ9n2p4dwtwl7Y5mn14WDxrPYmQ5zCl5lr/Z8P0G1OeFnm+0z3rH8Pb7G3/8AZwf8/wCf/D03QmqHED4JkHaXsHtT8NZ7Hj5rB/z/AJ/8NhSbM9Rzkc7FTwA9L5cn0ALNYlj8kafxBix8bZvaDZJITm43QAfNgj3+k+5bY4fuyBd8TN/04f7LXaNAWC2clwpO6JQf8Sc8o59SkRx64+hTZHLZV+05aXsWaOOOJobG1rGjg1owFv1rwVzbk+59dyHgIABHDpQEoAQAgBACA//Z",
          duration:track.duration_ms,
          album:track.album.name,
          context_uri:track.album.uri,
          track_number:track.track_number,
        })),
      };
      dispatch({type:reducerCases.SET_PLAYLIST,selectedPlaylist});
    };
    getInitialPlaylist();
  },[token,dispatch,selectedPlaylistId]);
  const msToMinutesAndSeconds=(ms)=>{
    const minutes=Math.floor(ms/60000);
    const seconds=((ms%60000)/1000).toFixed(0);
    return minutes+":"+(seconds<10?"00":""+seconds);

  };
  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    try{
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  }
  catch(err)
  {
  }
  };
  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id} onClick={()=>playTrack(id,name,artists,image,context_uri,track_number)}
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name!==""?name:"song not found"}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album!==""?album:"user doesn't have access to this content"}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`; 

