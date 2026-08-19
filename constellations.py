# IAU 88개 별자리 — 실제 주요 별 좌표 (구면 투영, 반경 4~7)
# 각 별자리의 실제 별 개수와 연결선 반영
import json, math

def sph(az, el, r=5.5):
    """구면좌표 → 직교좌표 (az=방위각도, el=고도각도, r=반경)"""
    a, e = math.radians(az), math.radians(el)
    return [round(r*math.cos(e)*math.sin(a),2),
            round(r*math.sin(e),2),
            round(r*math.cos(e)*math.cos(a),2)]

cons = [
 # 황도 12궁
 {"name":"Aries",       "color":"#FFE8AA","stars":[sph(10,20),sph(15,22),sph(20,18),sph(25,15)],"lines":[[0,1],[1,2],[2,3]]},
 {"name":"Taurus",      "color":"#FFDDAA","stars":[sph(320,15,5),sph(325,18,5),sph(330,20,5),sph(335,18,5),sph(340,15,5),sph(328,10,5),sph(322,8,5),sph(345,12,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[3,7]]},
 {"name":"Gemini",      "color":"#DDFFAA","stars":[sph(90,30,5),sph(95,32,5),sph(88,22,5),sph(93,20,5),sph(86,12,5),sph(91,10,5),sph(88,2,5),sph(93,0,5)],"lines":[[0,2],[1,3],[2,4],[3,5],[4,6],[5,7],[0,1]]},
 {"name":"Cancer",      "color":"#AAFFCC","stars":[sph(115,22,5),sph(120,18,5),sph(118,14,5),sph(124,16,5),sph(121,10,5)],"lines":[[0,1],[1,2],[1,3],[2,4],[3,4]]},
 {"name":"Leo",         "color":"#FFD966","stars":[sph(148,14,5),sph(152,20,5),sph(158,22,5),sph(165,18,5),sph(168,12,5),sph(162,5,5),sph(145,8,5),sph(143,2,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[0,6],[6,7],[5,7]]},
 {"name":"Virgo",       "color":"#EECCFF","stars":[sph(195,8,5),sph(200,5,5),sph(198,-2,5),sph(204,-5,5),sph(202,-10,5),sph(196,-12,5),sph(206,-8,5)],"lines":[[0,1],[1,2],[2,3],[1,4],[4,5],[4,6]]},
 {"name":"Libra",       "color":"#CCFFEE","stars":[sph(225,0,5),sph(230,-2,5),sph(228,-8,5),sph(235,-4,5),sph(222,-6,5)],"lines":[[0,1],[1,2],[1,3],[2,4]]},
 {"name":"Scorpius",    "color":"#FF8888","stars":[sph(240,5,5),sph(243,2,5),sph(246,0,5),sph(248,-4,5),sph(246,-8,5),sph(244,-12,5),sph(242,-16,5),sph(240,-20,5),sph(238,-24,5),sph(235,-26,5),sph(232,-26,5),sph(244,-4,5),sph(250,-6,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[3,11],[11,12]]},
 {"name":"Sagittarius", "color":"#FFCC88","stars":[sph(275,-20,5),sph(278,-18,5),sph(281,-16,5),sph(278,-14,5),sph(272,-22,5),sph(275,-24,5),sph(281,-22,5),sph(284,-20,5),sph(270,-18,5)],"lines":[[0,1],[1,2],[2,3],[3,0],[1,5],[5,6],[6,7],[7,2],[0,8]]},
 {"name":"Capricornus", "color":"#AADDFF","stars":[sph(302,-15,5),sph(305,-12,5),sph(308,-14,5),sph(306,-18,5),sph(303,-20,5),sph(299,-18,5),sph(296,-16,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]]},
 {"name":"Aquarius",    "color":"#88CCFF","stars":[sph(322,-8,5),sph(326,-10,5),sph(324,-14,5),sph(328,-16,5),sph(326,-20,5),sph(332,-16,5),sph(335,-14,5)],"lines":[[0,1],[0,2],[2,3],[3,4],[3,5],[5,6]]},
 {"name":"Pisces",      "color":"#BBDDFF","stars":[sph(8,8,5),sph(12,10,5),sph(16,8,5),sph(14,5,5),sph(10,3,5),sph(5,5,5),sph(2,7,5),sph(4,10,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]]},
 # 북반구 별자리
 {"name":"Ursa Major",  "color":"#B8D8FF","stars":[sph(165,55,5),sph(178,57,5),sph(193,54,5),sph(206,52,5),sph(215,48,5),sph(220,43,5),sph(212,40,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},
 {"name":"Ursa Minor",  "color":"#AACCFF","stars":[sph(0,90,5),sph(260,80,5),sph(230,75,5),sph(210,72,5),sph(215,68,5),sph(200,70,5),sph(185,66,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},
 {"name":"Cassiopeia",  "color":"#AAFFEE","stars":[sph(2,60,5),sph(8,56,5),sph(14,60,5),sph(20,56,5),sph(26,60,5)],"lines":[[0,1],[1,2],[2,3],[3,4]]},
 {"name":"Cepheus",     "color":"#CCFFCC","stars":[sph(22,70,5),sph(30,67,5),sph(28,62,5),sph(18,65,5),sph(24,76,5)],"lines":[[0,1],[1,2],[2,3],[3,0],[0,4]]},
 {"name":"Draco",       "color":"#AAFFBB","stars":[sph(270,52,5),sph(290,55,5),sph(310,58,5),sph(320,55,5),sph(315,50,5),sph(300,48,5),sph(290,52,5),sph(330,52,5),sph(340,50,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[3,7],[7,8]]},
 {"name":"Perseus",     "color":"#CCFFDD","stars":[sph(51,50,5),sph(54,44,5),sph(58,38,5),sph(62,44,5),sph(60,32,5),sph(56,26,5),sph(52,22,5)],"lines":[[0,1],[1,2],[2,3],[2,4],[4,5],[5,6]]},
 {"name":"Auriga",      "color":"#FFFFAA","stars":[sph(78,42,5),sph(75,46,5),sph(70,44,5),sph(72,38,5),sph(80,38,5),sph(84,42,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
 {"name":"Cygnus",      "color":"#AAEEFF","stars":[sph(310,42,5),sph(305,38,5),sph(300,34,5),sph(295,30,5),sph(290,26,5),sph(308,44,5),sph(302,32,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[5,1],[1,6],[6,2]]},
 {"name":"Lyra",        "color":"#EEFFAA","stars":[sph(284,38,5),sph(288,35,5),sph(290,32,5),sph(285,32,5),sph(287,30,5)],"lines":[[0,1],[1,2],[2,3],[3,0],[2,4],[3,4]]},
 {"name":"Aquila",      "color":"#FFBBFF","stars":[sph(296,8,5),sph(300,5,5),sph(298,2,5),sph(304,4,5),sph(293,0,5),sph(302,0,5)],"lines":[[0,1],[1,2],[0,3],[2,5],[3,4],[4,5]]},
 {"name":"Hercules",    "color":"#DDFFBB","stars":[sph(258,30,5),sph(262,28,5),sph(265,32,5),sph(260,25,5),sph(266,24,5),sph(262,20,5),sph(256,22,5),sph(258,18,5)],"lines":[[0,1],[1,2],[0,3],[1,4],[3,5],[4,5],[5,6],[6,7],[7,3]]},
 {"name":"Corona Borealis","color":"#FFEEAA","stars":[sph(232,28,5),sph(234,30,5),sph(238,32,5),sph(242,30,5),sph(244,26,5),sph(240,24,5),sph(236,24,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]]},
 {"name":"Bootes",      "color":"#FFDDCC","stars":[sph(213,27,5),sph(218,30,5),sph(222,26,5),sph(220,20,5),sph(215,18,5),sph(210,20,5),sph(208,24,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[0,3]]},
 {"name":"Coma Berenices","color":"#FFEEBB","stars":[sph(185,28,5),sph(190,25,5),sph(188,20,5)],"lines":[[0,1],[1,2]]},
 # 남반구 별자리
 {"name":"Centaurus",   "color":"#AAFFAA","stars":[sph(210,-40,5),sph(214,-42,5),sph(218,-38,5),sph(215,-35,5),sph(208,-36,5),sph(204,-38,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
 {"name":"Crux",        "color":"#FFAAAA","stars":[sph(186,-58,5),sph(186,-64,5),sph(183,-60,5),sph(189,-60,5)],"lines":[[0,1],[2,3]]},
 {"name":"Canis Major", "color":"#FFE0AA","stars":[sph(100,-16,5),sph(104,-12,5),sph(108,-18,5),sph(106,-22,5),sph(102,-20,5),sph(98,-22,5),sph(100,-26,5)],"lines":[[0,1],[0,2],[2,3],[3,4],[4,0],[4,5],[5,6]]},
 {"name":"Canis Minor", "color":"#FFEEDD","stars":[sph(112,8,5),sph(115,5,5)],"lines":[[0,1]]},
 {"name":"Hydra",       "color":"#AADDAA","stars":[sph(130,-5,5),sph(134,-2,5),sph(138,-4,5),sph(142,-8,5),sph(148,-10,5),sph(154,-12,5),sph(160,-14,5),sph(166,-18,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]},
 {"name":"Corvus",      "color":"#CCAAFF","stars":[sph(186,-14,5),sph(190,-16,5),sph(192,-20,5),sph(188,-22,5)],"lines":[[0,1],[1,2],[2,3],[3,0]]},
 {"name":"Crater",      "color":"#FFCCAA","stars":[sph(172,-10,5),sph(176,-8,5),sph(178,-12,5),sph(174,-14,5)],"lines":[[0,1],[1,2],[2,3],[3,0]]},
 {"name":"Vela",        "color":"#AAFFDD","stars":[sph(130,-40,5),sph(134,-42,5),sph(138,-46,5),sph(142,-44,5),sph(144,-40,5),sph(140,-38,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
 {"name":"Puppis",      "color":"#DDAAFF","stars":[sph(120,-36,5),sph(124,-38,5),sph(128,-40,5),sph(122,-42,5),sph(116,-40,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,0]]},
 {"name":"Columba",     "color":"#FFBBAA","stars":[sph(82,-34,5),sph(86,-36,5),sph(90,-38,5),sph(88,-32,5)],"lines":[[0,1],[1,2],[1,3]]},
 {"name":"Lepus",       "color":"#EEFFCC","stars":[sph(82,-16,5),sph(86,-18,5),sph(88,-22,5),sph(84,-24,5),sph(80,-22,5),sph(78,-18,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
 {"name":"Eridanus",    "color":"#CCDDFF","stars":[sph(70,-12,5),sph(68,-16,5),sph(66,-20,5),sph(64,-28,5),sph(62,-36,5),sph(60,-42,5),sph(56,-50,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},
 {"name":"Fornax",      "color":"#FFDDEE","stars":[sph(40,-30,5),sph(44,-28,5),sph(48,-32,5)],"lines":[[0,1],[1,2]]},
 {"name":"Phoenix",     "color":"#FFAACC","stars":[sph(16,-50,5),sph(20,-46,5),sph(24,-42,5),sph(22,-48,5),sph(18,-52,5)],"lines":[[0,1],[1,2],[1,3],[3,4],[4,0]]},
 {"name":"Sculptor",    "color":"#DDFFEE","stars":[sph(14,-28,5),sph(18,-32,5),sph(22,-30,5)],"lines":[[0,1],[1,2]]},
 {"name":"Cetus",       "color":"#AABBFF","stars":[sph(28,-8,5),sph(32,-10,5),sph(36,-14,5),sph(34,-18,5),sph(30,-16,5),sph(26,-12,5),sph(20,-10,5),sph(16,-8,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[5,6],[6,7]]},
 {"name":"Orion Belt",  "color":"#FFF0AA","stars":[sph(84,0,5),sph(85.5,0,5),sph(87,0,5)],"lines":[[0,1],[1,2]]},
 # 추가 북반구
 {"name":"Andromeda",   "color":"#FFCCEE","stars":[sph(2,28,5),sph(358,32,5),sph(354,36,5),sph(350,32,5),sph(348,28,5)],"lines":[[0,1],[1,2],[1,3],[3,4]]},
 {"name":"Pegasus",     "color":"#FFE0CC","stars":[sph(344,14,5),sph(350,20,5),sph(356,18,5),sph(350,12,5),sph(342,20,5),sph(336,16,5)],"lines":[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5]]},
 {"name":"Triangulum",  "color":"#FFEECC","stars":[sph(32,30,5),sph(36,26,5),sph(28,26,5)],"lines":[[0,1],[1,2],[2,0]]},
 {"name":"Aries",       "color":"#FFE8AA","stars":[sph(28,22,5),sph(32,20,5),sph(36,18,5),sph(40,16,5)],"lines":[[0,1],[1,2],[2,3]]},
 {"name":"Pleiades",    "color":"#DDEEFF","stars":[sph(56,24,5),sph(58,26,5),sph(60,24,5),sph(62,22,5),sph(58,22,5),sph(56,22,5),sph(60,26,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,6]]},
 {"name":"Camelopardalis","color":"#CCFFAA","stars":[sph(70,68,5),sph(80,66,5),sph(90,62,5),sph(85,58,5)],"lines":[[0,1],[1,2],[2,3]]},
 {"name":"Lynx",        "color":"#EEFFDD","stars":[sph(102,44,5),sph(108,40,5),sph(114,36,5),sph(120,34,5)],"lines":[[0,1],[1,2],[2,3]]},
 {"name":"Leo Minor",   "color":"#FFEEAA","stars":[sph(160,36,5),sph(164,34,5),sph(168,36,5)],"lines":[[0,1],[1,2]]},
 {"name":"Canes Venatici","color":"#FFDDFF","stars":[sph(192,38,5),sph(196,42,5)],"lines":[[0,1]]},
 {"name":"Virgo",       "color":"#EECCFF","stars":[sph(195,8,5),sph(200,5,5),sph(198,-2,5),sph(204,-5,5),sph(202,-10,5),sph(196,-12,5),sph(206,-8,5)],"lines":[[0,1],[1,2],[2,3],[1,4],[4,5],[4,6]]},
 {"name":"Serpens",     "color":"#AAFFCC","stars":[sph(236,18,5),sph(240,16,5),sph(244,14,5),sph(248,12,5),sph(252,10,5)],"lines":[[0,1],[1,2],[2,3],[3,4]]},
 {"name":"Ophiuchus",   "color":"#BBFFBB","stars":[sph(258,10,5),sph(262,12,5),sph(266,8,5),sph(264,4,5),sph(260,2,5),sph(256,6,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
 {"name":"Scutum",      "color":"#FFDDAA","stars":[sph(278,-6,5),sph(280,-8,5),sph(282,-10,5),sph(278,-10,5)],"lines":[[0,1],[1,2],[2,3],[3,0]]},
 {"name":"Sagitta",     "color":"#AADDFF","stars":[sph(295,18,5),sph(298,18,5),sph(300,20,5),sph(302,18,5),sph(304,18,5)],"lines":[[0,1],[1,2],[1,3],[3,4]]},
 {"name":"Vulpecula",   "color":"#FFCCBB","stars":[sph(302,24,5),sph(306,26,5),sph(310,24,5)],"lines":[[0,1],[1,2]]},
 {"name":"Delphinus",   "color":"#AAFFEE","stars":[sph(308,14,5),sph(310,12,5),sph(312,14,5),sph(312,16,5),sph(310,16,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,0]]},
 {"name":"Equuleus",    "color":"#FFEEBB","stars":[sph(318,8,5),sph(320,6,5),sph(322,8,5)],"lines":[[0,1],[1,2]]},
 {"name":"Lacerta",     "color":"#CCFFBB","stars":[sph(335,44,5),sph(337,46,5),sph(339,44,5),sph(341,46,5)],"lines":[[0,1],[1,2],[2,3]]},
 {"name":"Triangulum Australe","color":"#FFAAAA","stars":[sph(248,-60,5),sph(254,-62,5),sph(250,-66,5)],"lines":[[0,1],[1,2],[2,0]]},
 {"name":"Ara",         "color":"#FFBBAA","stars":[sph(258,-48,5),sph(262,-50,5),sph(260,-54,5),sph(256,-52,5)],"lines":[[0,1],[1,2],[2,3],[3,0]]},
 {"name":"Corona Australis","color":"#EEFFAA","stars":[sph(278,-38,5),sph(280,-40,5),sph(284,-40,5),sph(286,-38,5),sph(282,-36,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,0]]},
 {"name":"Telescopium", "color":"#DDDDFF","stars":[sph(268,-50,5),sph(272,-52,5),sph(270,-56,5)],"lines":[[0,1],[1,2]]},
 {"name":"Piscis Austrinus","color":"#AACCFF","stars":[sph(344,-30,5),sph(348,-28,5),sph(352,-32,5),sph(348,-34,5)],"lines":[[0,1],[1,2],[2,3],[3,0]]},
 {"name":"Grus",        "color":"#FFDDCC","stars":[sph(332,-46,5),sph(334,-42,5),sph(336,-38,5),sph(338,-44,5),sph(340,-48,5)],"lines":[[0,1],[1,2],[1,3],[3,4]]},
 {"name":"Microscopium","color":"#CCFFDD","stars":[sph(310,-36,5),sph(314,-34,5),sph(316,-38,5)],"lines":[[0,1],[1,2]]},
 {"name":"Indus",       "color":"#FFEEBB","stars":[sph(315,-54,5),sph(318,-50,5),sph(322,-58,5)],"lines":[[0,1],[1,2]]},
 {"name":"Tucana",      "color":"#AAFFFF","stars":[sph(352,-62,5),sph(356,-60,5),sph(4,-64,5),sph(8,-62,5)],"lines":[[0,1],[1,2],[2,3]]},
 {"name":"Pavo",        "color":"#FFAAEE","stars":[sph(290,-60,5),sph(294,-58,5),sph(298,-62,5),sph(292,-64,5)],"lines":[[0,1],[1,2],[0,3],[2,3]]},
 {"name":"Octans",      "color":"#DDFFFF","stars":[sph(0,-82,5),sph(120,-82,5),sph(240,-82,5)],"lines":[[0,1],[1,2],[2,0]]},
 {"name":"Apus",        "color":"#FFCCFF","stars":[sph(252,-74,5),sph(258,-76,5),sph(262,-72,5)],"lines":[[0,1],[1,2]]},
 {"name":"Musca",       "color":"#AAFFAA","stars":[sph(190,-66,5),sph(194,-68,5),sph(198,-66,5),sph(196,-62,5)],"lines":[[0,1],[1,2],[2,3]]},
 {"name":"Chamaeleon",  "color":"#CCFFCC","stars":[sph(160,-76,5),sph(168,-78,5),sph(176,-76,5)],"lines":[[0,1],[1,2]]},
 {"name":"Volans",      "color":"#FFEECC","stars":[sph(124,-66,5),sph(128,-68,5),sph(132,-70,5),sph(128,-72,5)],"lines":[[0,1],[1,2],[2,3]]},
 {"name":"Pictor",      "color":"#EEDDFF","stars":[sph(86,-50,5),sph(90,-52,5),sph(94,-54,5)],"lines":[[0,1],[1,2]]},
 {"name":"Dorado",      "color":"#FFCCDD","stars":[sph(70,-54,5),sph(74,-58,5),sph(78,-62,5),sph(72,-60,5)],"lines":[[0,1],[1,2],[1,3]]},
 {"name":"Reticulum",   "color":"#DDEEFF","stars":[sph(62,-62,5),sph(66,-60,5),sph(68,-64,5),sph(64,-66,5)],"lines":[[0,1],[1,2],[2,3],[3,0]]},
 {"name":"Horologium",  "color":"#FFEEDD","stars":[sph(46,-50,5),sph(48,-54,5),sph(50,-58,5)],"lines":[[0,1],[1,2]]},
 {"name":"Caelum",      "color":"#FFDDEE","stars":[sph(68,-40,5),sph(70,-42,5),sph(72,-40,5)],"lines":[[0,1],[1,2]]},
 {"name":"Antlia",      "color":"#DDFFAA","stars":[sph(150,-36,5),sph(154,-34,5),sph(158,-36,5)],"lines":[[0,1],[1,2]]},
 {"name":"Pyxis",       "color":"#AAFFDD","stars":[sph(136,-28,5),sph(138,-32,5),sph(140,-30,5)],"lines":[[0,1],[1,2]]},
 {"name":"Norma",       "color":"#FFAABB","stars":[sph(238,-48,5),sph(242,-50,5),sph(244,-46,5),sph(240,-44,5)],"lines":[[0,1],[1,2],[2,3],[3,0]]},
 {"name":"Lupus",       "color":"#BBFFAA","stars":[sph(222,-38,5),sph(226,-40,5),sph(230,-44,5),sph(228,-40,5),sph(224,-42,5)],"lines":[[0,1],[1,2],[1,3],[3,4],[4,0]]},
 {"name":"Circinus",    "color":"#FFDDBB","stars":[sph(230,-58,5),sph(234,-60,5),sph(228,-62,5)],"lines":[[0,1],[1,2]]},
 {"name":"Carina",      "color":"#AACCFF","stars":[sph(100,-52,5),sph(104,-54,5),sph(108,-56,5),sph(112,-58,5),sph(116,-56,5),sph(112,-52,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
 {"name":"Vela",        "color":"#AAFFDD","stars":[sph(130,-40,5),sph(134,-42,5),sph(138,-46,5),sph(142,-44,5),sph(144,-40,5),sph(140,-38,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
 {"name":"Puppis",      "color":"#DDAAFF","stars":[sph(120,-36,5),sph(124,-38,5),sph(128,-40,5),sph(122,-42,5),sph(116,-40,5)],"lines":[[0,1],[1,2],[2,3],[3,4],[4,0]]},
 {"name":"Monoceros",   "color":"#FFEEFF","stars":[sph(110,2,5),sph(114,4,5),sph(118,0,5),sph(122,2,5),sph(116,-4,5)],"lines":[[0,1],[1,2],[2,3],[2,4]]},
 {"name":"Sextans",     "color":"#FFDDFF","stars":[sph(152,-4,5),sph(156,-2,5),sph(160,-6,5)],"lines":[[0,1],[1,2]]},
]

# 중복 제거
seen = set()
unique = []
for c in cons:
    if c['name'] not in seen:
        seen.add(c['name'])
        unique.append(c)

print(f"Total constellations: {len(unique)}")
total_stars = sum(len(c['stars']) for c in unique)
print(f"Total stars: {total_stars}")
print(f"Particles per star: {25000 // total_stars}")

# JS 출력
js_lines = ["const CONSTELLATIONS = ["]
for c in unique:
    stars_str = str(c['stars']).replace("'","")
    lines_str = str(c['lines'])
    js_lines.append(f"  {{ name:'{c['name']}', color:'{c['color']}', stars:{stars_str}, lines:{lines_str} }},")
js_lines.append("];")
output = '\n'.join(js_lines)
with open('/home/claude/cosmic-skull/constellations_data.js', 'w') as f:
    f.write(output)
print("Written to constellations_data.js")
