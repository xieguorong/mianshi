
//����IE FF��ȡclassname Bug����
/*
	ClassName ---->��ȡ��ǩ��
	obj       ---->������(ָ���ķ�Χ)������Ϊ��
*/
		function getClass(ClassName,obj) {
			obj = obj || document;
			newArr = [];
			if(document.getElementsByClassName){
				return obj.getElementsByClassName(ClassName);
			}else{
				var tmp = obj.getElementsByTagName("*");
				for (var i=0; i<tmp.length; i++) {
					if (tmp[i].className == ClassName) {
						newArr.push(tmp[i]);
					}
				}
				return newArr;
			}
		}

//����IE FF��������Bug����
/*
	ClassName  ---->��ǩ��
	texts      ---->����������(����Ϊ��)
*/

		function Content(ClassName,texts) {
			if(document.all){
				if(texts){
					return ClassName.innerText = texts;
				}else{
					return ClassName.innerText;
				}
			}else{
				if(texts){
					return ClassName.textContent = texts;
				}else{
					return ClassName.textContent;
				}
			}
		}

//����IE FF��ȡcss������ʽ����Bug
/*
	obj  ---->��������
	att  ---->����������
*/
		function getAtt(obj,att) {
			if(document.all){
				return obj.currentStyle[att];
			}else{
				return getComputedStyle(obj,null)[att];
			}
		}



//��ȡԪ�ص����нڵ�
/*
	ob��Ҫ��ȡ���нڵ�Ķ���
	**********����ֵ����������ʽ����**********
*/
	function childs (obj) {
		childs = obj.childNodes;
		var arr = [];
		for (var i=0; i<childs.length; i++) {
			if (childs[i].nodeType == 3) {
				continue
			}else{
				arr.push(childs[i])
			}
		}
		return arr
	}


//��ȡ����ĵ�һ���ӽڵ�
/*
	obj��Ҫ��ȡ��һ���ӽڵ�Ķ���
	��ԭ�������firstC.nodeType�����ı�ʱ ��Ѱ����һ���ֵܽڵ�  �Դ�����
*/
	function firstC (obj) {
		var firstC = obj.firstChild;
		while(firstC.nodeType == 3) {
			firstC = firstC.nextSibling;
		}
		return firstC;
	}

//��ȡ��������һ���ڵ�
/*
	obj��Ҫ��ȡ���һ���ӽڵ�Ķ���
	��ԭ�������lastC.nodeType���ı�ʱ ��Ѱ����һ���ֵܽڵ�  �Դ�����
*/
	function lastC (obj) {
		var lastC = obj.lastChild;
		while(lastC.nodeType == 3){
			lastC = lastC.previousSibling;
		}
		return lastC;
	}


//��ȡ��һ���ֵܽڵ����FF
/*
	obj��Ҫ��ȡ��һ���ֵܽڵ�Ķ���
*/
	function previous(obj) {
		var previous = obj.previousSibling;
		while(previous.nodeType == 3){
			previous = previous.previousSibling;
		}
		return previous;
	}

//��ȡ��һ���ֵܽڵ����FF
/*
	obj��Ҫ��ȡ��һ���ֵܽڵ�Ķ���
*/
	function nextS(obj) {
		var nexts = obj.nextSibling;
		while(nexts.nodeType == 3){
			nexts = nexts.nextSibling;
		}
		return nexts;
	}


//�Ѵ����Ķ������һ������ĺ���
	function insertAfte(out,obj,insert) {
		var nextt = insert.nextSibling;
		out.insertBefore(obj,nextt);
	}





//***********************************************************************************************************






